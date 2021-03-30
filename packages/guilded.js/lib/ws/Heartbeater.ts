import GatewayHandler from './GatewayHandler';

export default class Heartbeater {
    public interval!: NodeJS.Timeout;
    public lastPingSentAt = 0;
    public active = false;

    constructor(public gateway: GatewayHandler) {}
    public start(interval?: number): void {
        this.gateway.client.debug('Heartbeating...');
        this.active = true;
        this.interval = setInterval(
            this.sendHB.bind(this),
            interval ?? this.gateway.client.options?.ws?.heartbeatInterval ?? 15000,
        );
    }

    public destroy(): void {
        clearInterval(this.interval);
        this.active = false;
    }

    public sendHB(): void {
        if (!this.gateway.ws) return;
        if (this.gateway.ws.readyState !== 1) return;
        this.lastPingSentAt = Date.now();
        this.gateway.ws.send('2');
        this.gateway.client.rest.put('/users/me/ping');
        this.gateway.client.debug('heartbeat sent');
    }
}
