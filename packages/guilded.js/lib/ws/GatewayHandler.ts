import WebSocket from 'ws';

import Client from '../structures/Client';
import Heartbeater from './Heartbeater';

export default abstract class GatewayHandler {
    public ws!: WebSocket | null;
    public heartbeater = new Heartbeater(this);
    public ping = 0;

    constructor(public readonly client: Client) {}
    public abstract init(): void;
    public destroy(): void {
        this.ws?.terminate();
        this.heartbeater.destroy();
    }
}
