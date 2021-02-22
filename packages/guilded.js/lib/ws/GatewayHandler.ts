import WebSocket from 'ws';

import Client from '../structures/Client';
import Heartbeater from './Heartbeater';

export default abstract class GatewayHandler {
    public ws!: WebSocket | null;
    public heartbeater = new Heartbeater(this);
    public ping = 0;
    public connectedAt: Date | null = null;

    constructor(public readonly client: Client) {}
    public abstract init(): void;
    public destroy(): void {
        if(!this.ws || !this.heartbeater.active) throw Error("Attempting to destroy WS connection that doesn't exist!");
        this.ws?.terminate();
        this.ws = null;
        this.heartbeater.destroy();
    }
}
