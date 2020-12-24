/*
Adapted from: https://github.com/Chixel/guilded.js/blob/master/src/Guilded.js#L54
Guilded.js - ChixelRT <https://github.com/Chixel>
*/
import { FetchMe } from '@guildedjs/guilded-api-typings';
import { RestManager } from '@guildedjs/guildedjs-rest';
import { EventEmitter } from 'events';

import { ClientEventParams } from '../typings/ClientEventParams';
import { WebSocketEvents } from '../typings/WebSocketEvents';
import Util from '../util';
import ClientGatewayHandler from '../ws/ClientGatewayHandler';
import DMChannel from './channels/DMChannel';
// import DMChannel from './channels/DMChannel';
import ClientUser from './ClientUser';
import ChannelManager from './managers/ChannelManager';
import TeamManager from './managers/TeamManager';
import UserManager from './managers/UserManager';
import Team from './Team';
import User from './User';

export default class Client extends EventEmitter {
    public readonly rest: RestManager;
    public user: User | null = null;
    public gateway: ClientGatewayHandler | null;
    public pingTimeout: (() => unknown) | null;
    public readonly util = Util;

    public teams = new TeamManager(this);
    public channels = new ChannelManager(this);
    public users = new UserManager(this);

    public constructor(public options?: Partial<ClientOptions>) {
        super();
        this.rest = new RestManager({
            apiURL: this.options?.rest?.apiURL,
        });
        this.gateway = null;
        this.pingTimeout = null;
    }

    public async login(options: LoginOptions): Promise<this> {
        await this.rest.init(options);

        const fetch_me: FetchMe = (await this.rest.get('/me')) as FetchMe;
        this.debug('Initial ME data recieved');

        this.user = new ClientUser(this, fetch_me.user);
        if (!this.options?.cache?.startupRestrictions.teams) {
            for (const team_data of fetch_me.teams) {
                const team = new Team(this, team_data);
                if (!this.options?.cache?.startupRestrictions.channels) await team.fetchChannels();
                this.teams.add(team);
            }
            this.debug('Initial Team data recieved.');
        }

        if (!this.options?.cache?.startupRestrictions.dms) {
            const fetch_dms = await this.rest.get(`/users/${this.user.id}/channels`);
            for (const dm_data of fetch_dms.channels) {
                const dm = new DMChannel(this, dm_data);
                this.channels.add(dm);
            }
            this.debug('Initial DM Channel data recieved.');
        }

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
    cache: {
        startupRestrictions: {
            dms: boolean;
            teams: boolean;
            channels: boolean;
        }
        teams: boolean;
        channels: boolean;
        users: boolean;
        members: boolean;
    }
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
