import GatewayHandler from './GatewayHandler';

export default class Heartbeater {
    constructor(public gateway: GatewayHandler) {}
    public start() {
        this.gateway.client.emit('debug', 'Heartbeating...');
        setInterval(this.sendHB, this.gateway.client.options?.heartbeatInterval ?? )
    }

    public sendHB(): unknown {
        if (!this.gateway.ws) return;
        if (this.gateway.ws.readyState !== 1) return;
        this.gateway.ws.send('2');
        this.gateway.client.rest.put('/users/me/ping');
    }
}
