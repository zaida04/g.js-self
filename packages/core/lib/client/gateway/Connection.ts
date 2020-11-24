import fetch from 'node-fetch';
import WebSocket from 'ws';

//import { Client } from '../Client';

export class Connection {
    /**
     * The websocket connection
     * @type {WebSocket}
     * @private
     */
    #ws!: WebSocket;

    public client: any;

    public constructor(client: any) {
        this.client = client;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public async connect() {
        if (this.#ws) {
            this._debug('Websocket connection found, closing and reconnecting..');
            this.#ws.close();
        }

        // @todo make the REST manager handle this
        const response = await fetch('https://api.guilded.gg/login', {
            headers: {
                Authorization: JSON.stringify({ email: this.client.email, password: this.client.password }),
            },
        });

        if (!response.headers.has('Get-Cookie')) {
            this.client.emit('error', new Error('Invalid email/password'));
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const cookie: string = response.headers.get('Get-Cookie').map(c => c.split(' ')[0]);

        this.#ws = new WebSocket('wss://api.guilded.gg/socket.io/?jwt=undefined&EIO=3&transport=websocket', {
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookie,
            },
        });
    }

    private _close(code?: number, reason?: string) {
        return this._debug(
            `Closed websocket connection with code ${code} with reason ${reason?.length ? reason : 'No reason'}`,
        );
    }

    private _debug(message: string) {
        return this.client.emit('debug', `(Connection) :: ${message}`);
    }
}
