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


/**
 * The main class used to interact with the Guilded API
 * 
 * ```javascript
 * const { Client } = require("@guildedjs/guilded.js");
 * const client = new Client();
 * 
 * client.login({
 *  email: "email",
 *  password: "password"
 * })
 * ```
 */
export default class Client extends EventEmitter {
    /**
     * Manager in charge of managing REST requests to the guilded API
     * @private
     */
    public readonly rest: RestManager;

    /**
     * The User belonging to this Client
     */
    public user: ClientUser | null = null;

    /**
     * Handler in charge of handling gateway events and keeping the ws connection alive
     * @private
     */
    public gateway: ClientGatewayHandler | null;

    /**
     * Function in charge of sending the heartbeat to Guilded
     * @private
     */
    private pingTimeout: (() => unknown) | null;

    /**
     * Utilities used throughout the project, such as converting a plain text string to a message
     * @internal
     */
    public readonly util = Util;

    /**
     * The teams that this client is in
     */
    public teams = new TeamManager(this);

    /**
     * The channels that this client can access
     */
    public channels = new ChannelManager(this);

    /**
     * The users belonging to anything handled by this client
     */
    public users = new UserManager(this);


    public constructor(public options?: Partial<ClientOptions>) {
        super();
        this.rest = new RestManager({
            apiURL: this.options?.rest?.apiURL,
        });
        this.gateway = null;
        this.pingTimeout = null;
    }

    /**
     * Login the client and establish a connection with the Guilded API
     * ```
     * <client>.login({
     *  "email": "email@domain.com",
     *  "password": "securepassword"
     * })
     * ```
     */
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

    /**
     * Set the password of this client.
     */
    public setPassword(newPassword: string) {
        if(typeof newPassword !== "string") throw new TypeError("Expecting a string password for password change.");
        return this.rest.post("/users/me/password", { newPassword }).then(() => void 0);
    }

    /**
     * Destroy the current connection to the API
     */
    public destroy(): void {
        this.rest.post("/logout", {}).finally(() => {
            this.rest.destroy();
            this.gateway?.destroy();
            this.debug('Client destroyed!');
            this.emit('disconnected');
        });
    }

    /**
     *
     * @hidden
    */
    public on<E extends keyof ClientEventParams>(event: E, cb: (...args: ClientEventParams[E]) => void): this;
    public on<S extends string | symbol>(
        event: Exclude<S, keyof ClientEventParams>,
        cb: (...args: any[]) => void,
    ): this;
    public on(event: string, cb: (...args: any[]) => void): this {
        return super.on(event, cb);
    }

    /**
     * Used to emit debug statements
     * @hidden 
     */
    public debug(str: string, ...args: any[]): undefined {
        // eslint-disable-next-line no-void
        return void this.emit('debug', `[DEBUG]: ${str}`, args);
    }
}

export type ClientPartial = 'MEMBER' | 'MESSAGE' | 'USER';

/**
 * Options you can instantiate the client with.
 */
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
        disallowReconnect: boolean;
        reconnectLimit: number;
    };
    rest: {
        apiURL: string;
    };
}

/**
 * Options to log the client in with
 */
export interface LoginOptions {
    email: string;
    password: string;
}
