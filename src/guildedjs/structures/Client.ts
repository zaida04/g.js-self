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
import { User } from '../..';

export default class Client {
    public emitter = new EventEmitter();
    public rest = new RestManager();
    public user: User | null = null;
    private gateway = new GatewayHandler(this);
    public ws: WebSocket | null;
    public pingTimeout: (() => unknown) | null;

    public teams = new TeamManager(this);
    public channels = new ChannelManager(this);

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
        const client_user_data = await this.rest.init(data);
        this.user = new User(this, client_user_data)._patch(client_user_data);

        const socketURL = `wss://${this.rest.baseDomain}/socket.io/?jwt=undefined&EIO=3&transport=websocket`;
        this.ws = new WebSocket(socketURL, {
            headers: {
                cookie: `hmac_signed_session=${this.rest.token}`,
            },
        });

        const teams_data = await this.rest.get('/me');
        for (const team in teams_data.team) {
            this.teams.add(team, true);
        }

        const dms_data = await this.rest.get(`/users/${this.user.id}/channels`);
        for (const dm in dms_data.dms) {
            this.channels.add(dm, true);
        }

        await this.gateway.init();
        this.emitter.emit('debug', this.rest._token);
        return undefined;
    }
}
