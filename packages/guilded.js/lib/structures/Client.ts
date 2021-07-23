import { CONSTANTS } from '@guildedjs/common';
import type { APIClientUser, APIDevice, APIGetCurrentUser, APIUser } from '@guildedjs/guilded-api-typings';
import { RestManager } from '@guildedjs/rest';
import { EventEmitter } from 'events';

import type { ClientOptions, LoginOptions } from '../typings';
import { ClientGatewayHandler } from '../ws/ClientGatewayHandler';
import { DMChannel } from './Channel';
import { ChannelManager } from './managers/ChannelManager';
import { TeamManager } from './managers/TeamManager';
import { UserManager } from './managers/UserManager';
import type { Message, MessageReaction } from './Message';
import { Team } from './Team';
import { User } from './User';

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
export class Client extends EventEmitter implements clientEvents {
    /**
     * Manager in charge of managing REST requests to the guilded API
     * @private
     */
    public readonly rest: RestManager = new RestManager({
        apiURL: this.options?.rest?.apiURL ?? CONSTANTS.BASE_DOMAIN,
    });

    /**
     * Manager in charge of managing REST requests related to the guilded CDN
     * @private
     */
    public readonly cdn: RestManager = new RestManager({
        apiURL: this.options?.rest?.cdnURL ?? CONSTANTS.MEDIA_DOMAIN,
    });

    /**
     * The User belonging to this Client
     * @readonly
     */
    public user: ClientUser | null = null;

    /**
     * Handler in charge of handling gateway events and keeping the ws connection alive
     * @private
     */
    public gateway: ClientGatewayHandler | null = null;

    /**
     * The teams that this client is in
     * @readonly
     */
    public readonly teams = new TeamManager(this);

    /**
     * The channels that this client can access
     * @readonly
     */
    public readonly channels = new ChannelManager(this);

    /**
     * The users belonging to anything handled by this client
     * @readonly
     */
    public readonly users = new UserManager(this);

    public constructor(public readonly options?: Partial<ClientOptions>) {
        super();
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
        if (!options.email || !options.password) throw new Error('You must provide an email/password');
        const [loginData] = await this.rest.make(
            {
                body: {
                    email: options.email,
                    password: options.password,
                },
                method: 'POST',
                path: '/login',
            },
            false,
        );

        const cookieJar = loginData.headers.get('Set-Cookie')!;
        if (!cookieJar) throw new Error('Incorrect Email/Pasword');
        this.rest.setAuth(cookieJar);

        const FETCH_ME = await this.rest.get<APIGetCurrentUser>('/me');
        this.debug('Initial ME data recieved');
        this.user = new ClientUser(this, FETCH_ME.user);

        if (!this.options?.cache?.startupRestrictions.dropTeams) {
            const teamChannelDataRequests = [];
            for (const TEAM_DATA of FETCH_ME.teams) {
                const team = new Team(this, TEAM_DATA);
                if (!this.options?.cache?.startupRestrictions.dropChannels) {
                    teamChannelDataRequests.push(team.fetchChannels());
                }
                this.teams.add(team);
            }
            await Promise.all(teamChannelDataRequests);
            this.debug('Initial Team data recieved.');
        }

        if (!this.options?.cache?.startupRestrictions.dropDMs) {
            const FETCH_DMS = await this.rest.get(`/users/${this.user.id}/channels`);
            for (const DM_DATA of FETCH_DMS.channels) {
                const dm = new DMChannel(this, DM_DATA);
                this.channels.add(dm);
            }
            this.debug('Initial DM Channel data recieved.');
        }
        this.gateway = new ClientGatewayHandler(this).init();
        return this;
    }

    /**
     * Set the password of this client.
     * @param newPassword the new password to set the current password to.
     */
    public setPassword(newPassword: string): Promise<void> {
        if (typeof newPassword !== 'string') throw new TypeError('Expecting a string password for password change.');
        return this.rest.post('/users/me/password', { newPassword }).then(() => void 0);
    }

    /**
     * Destroy the current connection to the API
     * @param intentionToReconnect Whether or not you want the client to reconnect immediately. Used internally for handling WS disconnects
     */
    public destroy(intentionToReconnect = false): void {
        if (intentionToReconnect) {
            return this.gateway?.destroy(true);
        } else {
            this.rest.post('/logout', {}).finally(() => {
                this.rest.destroy();
                this.gateway?.destroy(false);
            });
        }
        this.debug('Client destroyed!');
        this.emit('disconnected');
    }

    /**
     * Used to emit debug statements
     * @hidden
     */
    public debug(str: string, ...args: unknown[]): undefined {
        // eslint-disable-next-line no-void
        return void this.emit('debug', `[DEBUG]: ${str}`, args);
    }
}

/**
 * The user belonging to this client
 */
export class ClientUser extends User {
    /**
     * List of users that this client has blocked
     */
    public blockedUsers: unknown[];

    /**
     * Connections with other social media this client has
     */
    public socialLinks: unknown[];

    /**
     * Badges this client owns
     */
    public badges: string[];

    /**
     * The type of presence this client has
     */
    public userPresenceStatus!: number;

    /**
     * Information regarding the devices that have been used with this client
     */
    public devices: APIDevice[];

    public constructor(client: Client, data: APIClientUser) {
        super(client, data as APIUser);
        this.blockedUsers = data.blockedUsers ?? [];
        this.socialLinks = data.socialLinks ?? [];
        this.badges = data.badges ?? [];
        this.userPresenceStatus = data.userPresenceStatus;
        this.devices = data.devices ?? [];

        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public patch(data: APIClientUser): this {
        super.patch(data);
        return this;
    }

    public setPresence(presence: 'online' | 'idle' | 'dnd' | 'invisible'): Promise<this> {
        const newPresence = PRECENSES[presence];
        if (!newPresence) {
            throw new TypeError(
                `Incorrect status option. Expected online, idle, dnd, or invisible. Recieved ${presence}`,
            );
        }

        return this.client.rest.post('/users/me/presence', { status: newPresence }).then(() => {
            this.userPresenceStatus = newPresence;
            return this;
        });
    }

    public setUsername(newUsername: string): Promise<this> {
        if (typeof newUsername !== 'string') throw new TypeError('Expected a string for username change.');
        return this.client.rest.put(`/users/${this.id}/profilev2`, { name: newUsername }).then(() => this);
    }
}

const PRECENSES = {
    dnd: 3,
    idle: 2,
    invisible: 4,
    online: 1,
};

export interface clientEvents {
    /**
     * Fired when a reaction is removed from a message
     * @event
     */
    on(event: 'messageReactionDelete', listener: (reaction: MessageReaction, remover: User | string) => unknown): this;

    /**
     * Fired when a reaction is added to a message
     * @event
     */
    on(event: 'messageReactionAdd', listener: (reaction: MessageReaction, reacter: User | string) => unknown): this;

    /**
     * Fired when a message is sent
     * @event
     */
    on(event: 'messageCreate', listener: (message: Message) => unknown): this;

    /**
     * Fired when a message is updated
     * @event
     */
    on(event: 'messageUpdate', listener: (oldMessage: Message, newMessage: Message) => unknown): this;

    /**
     * Fired when client is confirmed destroyed with no reconnect
     * @event
     */
    on(event: 'disconnected', listener: () => unknown): this;

    /**
     * Fired when the client has a ready connection to the WS gateway
     * @event
     */
    on(event: 'ready', listener: () => unknown): this;

    /**
     * Fired on any event from the WS gateway that includes a payload and type 42
     * @event
     */
    on(event: 'raw', listener: (event_name: string, event_data: Record<string, unknown>) => unknown): this;

    /**
     * Fired in various different places, used for diagnostic purposes
     * @event
     */
    on(event: 'debug', listener: (...args: unknown[]) => unknown): this;

    /**
     * Fired when the WS is reconnecting
     * @event
     */
    on(event: 'reconnecting', listener: () => unknown): this;
}
