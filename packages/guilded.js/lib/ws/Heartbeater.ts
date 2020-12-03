import GatewayHandler from './GatewayHandler';

export default class Heartbeater {
    public interval!: NodeJS.Timeout;
    public pingSentAt = 0;

    constructor(public gateway: GatewayHandler) {}
    public start(): void {
        this.gateway.client.emit('debug', 'Heartbeating...');
        this.interval = setInterval(this.sendHB, this.gateway.client.options?.ws?.heartbeatInterval ?? 10000);
    }

    public destroy(): void {
        clearInterval(this.interval);
    }

    public sendHB(): void {
        if (!this.gateway.ws) return;
        if (this.gateway.ws.readyState !== 1) return;
        this.pingSentAt = Date.now();
        this.gateway.ws.send('2');
        this.gateway.client.rest.put('/users/me/ping');
    }
}
