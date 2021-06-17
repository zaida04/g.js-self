import * as Util from '@guildedjs/common';
import type { APIGetCurrentUser } from '@guildedjs/guilded-api-typings';
import { EventEmitter } from 'events';

import { RestManager } from '../rest/RestManager';
import type { events } from '../typings/WebSocketEvents';
import { ClientGatewayHandler } from '../ws/ClientGatewayHandler';
import { DMChannel } from './Channel';
import { ClientUser } from './ClientUser';
import { ChannelManager } from './managers/ChannelManager';
import { TeamManager } from './managers/TeamManager';
import { UserManager } from './managers/UserManager';
import type { Message } from './Message';
import type { MessageReaction } from './MessageReaction';
import { Team } from './Team';
import type { User } from './User';

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
        apiURL: this.options?.rest?.apiURL ?? Util.CONSTANTS.BASE_DOMAIN,
    });

    /**
     * Manager in charge of managing REST requests related to the guilded CDN
     * @private
     */
    public readonly cdn: RestManager = new RestManager({
        apiURL: this.options?.rest?.cdnURL ?? Util.CONSTANTS.MEDIA_DOMAIN,
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
     * Utilities used throughout the project, such as converting a plain text string to a message
     * @internal
     */
    public readonly util = Util;

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
        await this.rest.init(options);

        const FETCH_ME: APIGetCurrentUser = (await this.rest.get('/me')) as APIGetCurrentUser;
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
    public debug(str: string, ...args: any[]): undefined {
        // eslint-disable-next-line no-void
        return void this.emit('debug', `[DEBUG]: ${str}`, args);
    }
}

export interface clientEvents {
    /**
     * Fired when a reaction is removed from a message
     * @event
     */
    on(event: 'messageReactionDelete', listener: (reaction: MessageReaction, remover: User | string) => any): this;

    /**
     * Fired when a reaction is added to a message
     * @event
     */
    on(event: 'messageReactionAdd', listener: (reaction: MessageReaction, reacter: User | string) => any): this;

    /**
     * Fired when a message is sent
     * @event
     */
    on(event: 'messageCreate', listener: (message: Message) => any): this;

    /**
     * Fired when a message is updated
     * @event
     */
    on(event: 'messageUpdate', listener: (oldMessage: Message, newMessage: Message) => any): this;

    /**
     * Fired when client is confirmed destroyed with no reconnect
     * @event
     */
    on(event: 'disconnected', listener: () => any): this;

    /**
     * Fired when the client has a ready connection to the WS gateway
     * @event
     */
    on(event: 'ready', listener: () => any): this;

    /**
     * Fired on any event from the WS gateway that includes a payload and type 42
     * @event
     */
    on(event: 'raw', listener: (event_name: string, event_data: Record<string, any>) => any): this;

    /**
     * Fired in various different places, used for diagnostic purposes
     * @event
     */
    on(event: 'debug', listener: (...args: any[]) => any): this;

    /**
     * Fired when the WS is reconnecting
     * @event
     */
    on(event: 'reconnecting', listener: () => any): this;
}

export type clientPartial = 'MEMBER' | 'MESSAGE' | 'USER' | 'CHANNEL';

/**
 * Options you can instantiate the client with.
 */
export interface ClientOptions {
    partials: clientPartial[];
    cache: {
        startupRestrictions: {
            dropDMs: boolean;
            dropTeams: boolean;
            dropChannels: boolean;
        };
        cacheMaxSize: {
            teamsCache: number;
            channelsCache: number;
            usersCache: number;
            membersCache: number;
            memberRolesCache: number;
            teamRolesCache: number;
            teamWebhooksCache: number;
            groupsCache: number;
            messagesCache: number;
        };
        disableTeam: boolean;
        disableChannels: boolean;
        disableUsers: boolean;
        disableMembers: boolean;
        disableMembersRoles: boolean;
        disableTeamRoles: boolean;
        disableWebhooks: boolean;
        disableGroups: boolean;
        disableMessages: boolean;
    };
    ws: {
        heartbeatInterval: number;
        disabledEvents: events[];
        disallowReconnect: boolean;
        reconnectLimit: number;
        blockTeamWSConnection: boolean;
    };
    rest: {
        apiURL: string;
        cdnURL: string;
    };
}

/**
 * Options to log the client in with
 */
export interface LoginOptions {
    email: string;
    password: string;
}
