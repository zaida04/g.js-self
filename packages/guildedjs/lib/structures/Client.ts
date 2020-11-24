/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
Adapted from: https://github.com/Chixel/guilded.js/blob/master/src/Guilded.js#L54
Guilded.js - ChixelRT <https://github.com/Chixel>
*/
import { APIClientUser } from '@guildedjs/guilded-api-typings';
import { RestManager } from '@guildedjs/guildedjs-rest';
import { EventEmitter } from 'events';
import WebSocket from 'ws';

import { ClientOptions } from '../typings/ClientOptions';
import GatewayHandler from '../ws/ClientGatewayHandler';
import Channel from './Channel';
import ChannelManager from './managers/ChannelManager';
import TeamManager from './managers/TeamManager';
import UserManager from './managers/UserManager';
import Team from './Team';
import User from './User';

export default class Client extends EventEmitter {
    public rest = new RestManager();
    public user: User | null = null;
    private gateway = new GatewayHandler(this);
    public ws: WebSocket | null;
    public pingTimeout: (() => unknown) | null;

    public teams = new TeamManager(this);
    public channels = new ChannelManager(this);
    public users = new UserManager(this);

    public constructor(options?: ClientOptions) {
        super();
        this.ws = null;
        this.pingTimeout = null;
    }


    public async login(data: LoginOptions): Promise<undefined> {
        const ClientUser = await this.rest.init(data);
        this.user = new User(this, ClientUser.user as APIClientUser);

        const socketURL = `wss://${this.rest.baseDomain}/socket.io/?jwt=undefined&EIO=3&transport=websocket`;
        this.ws = new WebSocket(socketURL, {
            headers: {
                cookie: `hmac_signed_session=${this.rest.token}`,
            },
        });
        this.emit('debug', 'WebSocket connection established');

        const fetch_me = await this.rest.get('/me');
        this.emit('debug', 'Initial ME data recieved');

        for (const team_data of fetch_me.teams) {
            const team = new Team(this, team_data);
            this.teams.add(team);
        }
        const fetch_dms = await this.rest.get(`/users/${this.user.id}/channels`);
        for (const dm_data of fetch_dms.channels) {
            const dm = new Channel(this, null, dm_data);
            this.channels.add(dm);
        }
        this.emit('debug', 'Initial DM Channel data recieved');

        await this.gateway.init();
        this.emit('debug', 'Gateway initialized');
        return undefined;
    }
}

// add all client events here
export type ClientEvent = "messageCreate" | "ready" | "messageDelete" | "messageUpdate";

export interface LoginOptions {
    email: string;
    password: string;
}
