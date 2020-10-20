/* eslint-disable @typescript-eslint/no-non-null-assertion */
/*
Adapted from: https://github.com/Chixel/guilded.js/blob/master/src/Guilded.js#L54
Guilded.js - ChixelRT <https://github.com/Chixel>
*/

import RestManager from '../rest/RestManager';
import { LoginData } from '../typings/LoginData';
import WebSocket from 'ws';
import { EventEmitter } from 'events';

export default class Client {
    public emitter = new EventEmitter();
    public rest = new RestManager();
    public ws: WebSocket | null;
    public pingTimeout: (() => unknown) | null;

    constructor() {
        this.ws = null;
        this.pingTimeout = null;
    }

    sendHB(): unknown {
        if (!this.ws) return;
        if (this.ws.readyState !== 1) return;
        this.ws.send('2');
        setTimeout(this.sendHB, 10000);
    }

    async login(data: LoginData): Promise<undefined> {
        await this.rest.init(data);
        const socketURL = `wss://${this.rest.baseDomain}/socket.io/?jwt=undefined&EIO=3&transport=websocket`;
        this.ws = new WebSocket(socketURL, {
            headers: {
                cookie: `hmac_signed_session=${this.rest.token}`,
            },
        });

        this.ws.on('open', () => {
            this.emitter.emit('ready', '');
            this.sendHB();
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.ws.on('message', (incomingData: any) => {
            this.dataRecieved(incomingData);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.ws.on('close', (closeData: any) => {
            this.emitter.emit('disconnected', closeData);
        });

        return undefined;
    }

    // eslint-disable-next-line no-warning-comments
    // TODO: Separate actions in switch case statement
    /*
        Action Types:
        - ChatMessageCreated
        - ChatMessageUpdated
        - ChatMessageReactionAdded
        - TEAM_CHANNEL_ARCHIVED
        - TemporalChannelCreated
    */
    dataRecieved(incomingData: string): void {
        let data: string = incomingData;
        for (const char of data) {
            if (!(char >= '0' && char <= '9')) break;
            data = data.substr(1);
        }
        if (data.length < 3) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [event_name, event_data] = JSON.parse(data);

        switch (event_name) {
        }
    }
}
