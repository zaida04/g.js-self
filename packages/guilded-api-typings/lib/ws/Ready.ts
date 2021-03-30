export interface WSGatewayReady {
    sid: string;
    upgrades: unknown[];
    pingInterval: number;
    pingTimeout: number;
}
