/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
Adapted from: https://github.com/Chixel/guilded.js/blob/master/src/Guilded.js#L54
Guilded.js - ChixelRT <https://github.com/Chixel>
*/
import { EventEmitter } from 'events';
import WebSocket from 'ws';

import { Channel, Team } from '../..';
import RestManager, { FetchDMChannels, LoginData, Me } from '../../rest';
import GatewayHandler from '../../ws/ClientGatewayHandler';
import { ClientOptions } from '../typings/ClientOptions';
import ChannelManager from './managers/ChannelManager';
import TeamManager from './managers/TeamManager';
import UserManager from './managers/UserManager';
import User from './User';

export default class Client {
    public emitter = new EventEmitter();
    public rest = new RestManager();
    public user: User | null = null;
    private gateway = new GatewayHandler(this);
    public ws: WebSocket | null;
    public pingTimeout: (() => unknown) | null;

    public teams = new TeamManager(this);
    public channels = new ChannelManager(this);
    public users = new UserManager(this);

    constructor(options?: ClientOptions) {
        this.ws = null;
        this.pingTimeout = null;
    }

    async login(data: LoginData): Promise<undefined> {
        const { user } = await this.rest.init(data);
        this.user = new User(this, user);

        const socketURL = `wss://${this.rest.baseDomain}/socket.io/?jwt=undefined&EIO=3&transport=websocket`;
        this.ws = new WebSocket(socketURL, {
            headers: {
                cookie: `hmac_signed_session=${this.rest.token}`,
            },
        });
        this.emitter.emit('debug', 'WebSocket connection established');

        const fetch_me: Me = (await this.rest.get('/me')) as Me;
        this.emitter.emit('debug', 'Initial ME data recieved');

        for (const team_data of fetch_me.teams) {
            const team = new Team(this, team_data);
            this.teams.add(team);
        }
        const fetch_dms: FetchDMChannels = (await this.rest.get(`/users/${this.user.id}/channels`)) as FetchDMChannels;
        for (const dm_data of fetch_dms.channels) {
            const dm = new Channel(this, null, dm_data);
            this.channels.add(dm);
        }
        this.emitter.emit('debug', 'Initial DM Channel data recieved');

        await this.gateway.init();
        this.emitter.emit('debug', 'Gateway initialized');
        return undefined;
    }
}
