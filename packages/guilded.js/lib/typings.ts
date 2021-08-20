import { APIMessage, APIPartialMessage } from '@guildedjs/guilded-api-typings';

/**
 * The minimum amount of data that is needed to construct any structure
 * @internal
 */
export interface BaseData {
    readonly id: string;
}

/**
 * Adapted from https://github.com/discordjs/discord.js/blob/master/typings/index.d.ts#L2051
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type constructable<T> = new (...args: any[]) => T;

export interface PartialMessageData extends APIPartialMessage {
    channelId: string;
}

export interface UpgradedMessageData extends APIMessage {
    teamId?: string | null;
}

/* eslint-disable @typescript-eslint/naming-convention */
export enum websocket_events {
    CHAT_MESSAGE_CREATED = 'ChatMessageCreated',
    CHAT_MESSAGE_UPDATED = 'ChatMessageUpdated',
    CHAT_MESSAGE_REACTION_ADDED = 'ChatMessageReactionAdded',
    CHAT_MESSAGE_REACTION_DELETED = 'ChatMessageReactionDeleted',
}

export enum events {
    MESSAGE_CREATE = 'messageCreate',
    MESSAGE_UPDATE = 'messageUpdate',
    MESSAGE_REACTION_ADD = 'messageReactionAdd',
    MESSAGE_REACTION_DELETE = 'messageReactionDelete',
    READY = 'ready',
}

export type clientPartial = 'MEMBER' | 'MESSAGE' | 'USER' | 'CHANNEL';

/**
 * Options you can instantiate the client with.
 */
export interface ClientOptions {
    partials?: clientPartial[];
    cache?: {
        startupRestrictions?: {
            dropDMs?: boolean;
            dropTeams?: boolean;
            dropChannels?: boolean;
        };
        cacheMaxSize?: {
            teamsCache?: number;
            channelsCache?: number;
            usersCache?: number;
            membersCache?: number;
            memberRolesCache?: number;
            teamRolesCache?: number;
            teamWebhooksCache?: number;
            groupsCache?: number;
            messagesCache?: number;
        };
        disableTeam?: boolean;
        disableChannels?: boolean;
        disableUsers?: boolean;
        disableMembers?: boolean;
        disableMembersRoles?: boolean;
        disableTeamRoles?: boolean;
        disableWebhooks?: boolean;
        disableGroups?: boolean;
        disableMessages?: boolean;
    };
    ws?: {
        heartbeatInterval?: number;
        disabledEvents?: events[];
        disallowReconnect?: boolean;
        reconnectLimit?: number;
        blockTeamWSConnection?: boolean;
    };
    rest?: {
        apiURL?: string;
        cdnURL?: string;
    };
}

/**
 * Options to log the client in with
 */
export interface LoginOptions {
    email: string;
    password: string;
}
