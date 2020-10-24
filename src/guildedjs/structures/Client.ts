/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
Adapted from: https://github.com/Chixel/guilded.js/blob/master/src/Guilded.js#L54
Guilded.js - ChixelRT <https://github.com/Chixel>
*/

import RestManager from '../../rest/RestManager';
import { LoginData } from '../../rest/typings/LoginData';

import WebSocket from 'ws';
import { EventEmitter } from 'events';

import ChannelManager from './managers/ChannelManager';
import TeamManager from './managers/TeamManager';
import GatewayHandler from '../../ws/ClientGatewayHandler';
import User from './User';
import UserManager from './managers/UserManager';

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

    constructor() {
        this.ws = null;
        this.pingTimeout = null;
    }

    public sendHB(): unknown {
        if (!this.ws) return;
        if (this.ws.readyState !== 1) return;
        this.ws.send('2');
        setTimeout(this.sendHB, 5000);
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

        const { teams } = await this.rest.get('/me');

        // Debugging
        console.log(`TEAMS: ${JSON.stringify(teams)}`);

        for (const team in teams) {
            this.teams.add(team);
        }
        // https://api.guilded.gg/users/pmbOB8VA/channels:
        const { channels } = await this.rest.get(`/users/${this.user.id}/channels`, false);

        // Debugging
        console.log(`DMS: ${JSON.stringify(channels)}`);

        for (const dm in channels) {
            this.channels.add(dm);
        }

        await this.gateway.init();
        this.emitter.emit('debug', this.rest._token);
        return undefined;
    }
}
