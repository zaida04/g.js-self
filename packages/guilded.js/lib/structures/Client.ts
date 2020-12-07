/*
Adapted from: https://github.com/Chixel/guilded.js/blob/master/src/Guilded.js#L54
Guilded.js - ChixelRT <https://github.com/Chixel>
*/
import { APIClientUser, LoginResponse } from '@guildedjs/guilded-api-typings';
import { RestManager } from '@guildedjs/guildedjs-rest';
import { EventEmitter } from 'events';

import { ClientEventParams } from '../typings/ClientEventParams';
import { WebSocketEvents } from '../typings/WebSocketEvents';
import ClientGatewayHandler from '../ws/ClientGatewayHandler';
import User from './User';

export default class Client extends EventEmitter {
    public rest: RestManager;
    public user: User | null = null;
    public gateway: ClientGatewayHandler | null;
    public pingTimeout: (() => unknown) | null;

    // Public teams = new TeamManager(this);
    // public channels = new ChannelManager(this);
    // public users = new UserManager(this);

    public constructor(public options?: Partial<ClientOptions>) {
        super();
        this.rest = new RestManager({
            apiURL: this.options?.rest?.apiURL,
        });
        this.gateway = null;
        this.pingTimeout = null;
    }

    public async login(options: LoginOptions): Promise<this> {
        const loginRes: LoginResponse = (await this.rest.init(options)) as LoginResponse;
        // This.user = new User(this, loginRes.user);

        /*
        Const fetch_me = await this.rest.get('/me');
        this.emit('debug', 'Initial ME data recieved');

        for (const team_data of fetch_me.teams) {
            const team = new Team(this, team_data);
            this.teams.add(team);
        }
        const fetch_dms = await this.rest.get(`/users/${this.user.id}/channels`);
        for (const dm_data of fetch_dms.channels) {
            const dm = new Channel(this, null, dm_data);
            this.channels.add(dm);
        }
        this.emit('debug', 'Initial DM Channel data recieved');
        */

        this.gateway = new ClientGatewayHandler(this).init();
        return this;
    }
    public destroy(): void {
        this.rest.destroy();
        this.gateway?.destroy();
        this.debug('Client destroyed!');
        this.emit('disconnected');
    }

    public on<E extends keyof ClientEventParams>(event: E, cb: (...args: ClientEventParams[E]) => void): this;
    public on<S extends string | symbol>(
        event: Exclude<S, keyof ClientEventParams>,
        cb: (...args: any[]) => void,
    ): this;
    public on(event: string, cb: (...args: any[]) => void): this {
        return super.on(event, cb);
    }

    public debug(str: string, ...args: any[]): undefined {
        // eslint-disable-next-line no-void
        return void this.emit('debug', `[DEBUG]: ${str}`, args);
    }
}

export type ClientPartial = 'MEMBER' | 'MESSAGE' | 'USER';
export interface ClientOptions {
    partials: ClientPartial[];
    ws: {
        heartbeatInterval: number;
        disabledEvents: WebSocketEvents[];
    };
    rest: {
        apiURL: string;
    };
}

export interface LoginOptions {
    email: string;
    password: string;
}
