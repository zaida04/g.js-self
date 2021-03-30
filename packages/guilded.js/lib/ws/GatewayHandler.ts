import WebSocket from 'ws';

import type { Client } from '../structures/Client';
import Heartbeater from './Heartbeater';

export default abstract class GatewayHandler {
    public ws!: WebSocket | null;
    public heartbeater = new Heartbeater(this);
    public ping = 0;
    public connectedAt: Date | null = null;
    public sessionID: string | null = null;

    constructor(public readonly client: Client) {}
    public abstract init(): void;
    public destroy(intentionToReconnect: boolean): void {
        if(!this.ws || !this.heartbeater.active) throw Error("Attempting to destroy WS connection that doesn't exist!");
        
        /**
         * Credits to: https://github.com/Skillz4Killz/gapi/blob/master/src/websocket/Shard.ts#L186
         * AUTHOR: https://github.com/Skillz4Killz
         * LICENSE: APACHE LICENSE 2.0 (https://github.com/Skillz4Killz/gapi/blob/master/LICENSE)
         */
        if(intentionToReconnect && this.sessionID) {
            if (this.ws.readyState === WebSocket.OPEN) this.ws?.close(4901, 'Reconnect with session id please')
            else this.ws?.terminate();
        } else {
            this.ws?.close(1000, 'Clean close with no reconnection.')
        }

        this.ws.removeAllListeners();
        this.ws = null;
        this.heartbeater.destroy();

        if(intentionToReconnect) this.init();
    }
}
