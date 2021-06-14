import Collection from '@discordjs/collection';
import Embed from '@guildedjs/embeds';
import type {
    APIDMChannel,
    APITeamChannel,
    APIUser,
    CHANNEL_CONTENT_TYPES,
    CHANNEL_TYPES,
} from '@guildedjs/guilded-api-typings';

import type { BaseData } from '../typings/BaseData';
import { Base } from './Base';
import { Client } from './Client';
import type { Group } from './Group';
import { MessageManager } from './managers/MessageManager';
import type { Message } from './Message';
import { RolePermissionOverwrite } from './PermissionOverwrite';
import type { Role } from './Role';
import type { Team } from './Team';
import type { User } from './User';

/**
 * A partial channel, not enough data received however to construct a full channel type object.
 */
export class PartialChannel extends Base<BaseData> {
    /**
     * The messages belonging to this channel.
     * @readonly
     */
    public readonly messages: MessageManager | null;

    /**
     * The id of the Team this channel belongs to if it is a part of a Team.
     */
    public teamID: string | null;

    /**
     * The type of this channel ("Team", "DM").
     * @see {@link https://guilded.js.org/modules/guilded_js.html#channel_types}
     * @readonly
     */
    public readonly type: CHANNEL_TYPES;

    /**
     * The content type of this channel ("chat", "voice", "forum", "doc").
     * @see {@link https://guilded.js.org/modules/guilded_js.html#channel_content_types}
     * @readonly
     */
    public readonly contentType: CHANNEL_CONTENT_TYPES;

    /**
     * The date in which this channel was created.
     * @readonly
     */
    public readonly createdAt: Date;

    /**
     * The user ID belonging to the creator of this Team.
     * @readonly
     */
    public readonly createdBy: string;

    public constructor(
        client: Client,
        data: Partial<APITeamChannel | APIDMChannel>,
        private _team: Team | null,
        patch = true,
    ) {
        super(client, data as { id: string });
        this.teamID = _team?.id ?? ('teamId' in data && data.teamId ? data.teamId : null) ?? null;
        this.messages = new MessageManager(this.client, this);
        this.createdAt = new Date(data.createdAt!);
        this.createdBy = data.createdBy!;
        this.type = data.type!;
        this.teamID = 'teamId' in data ? data.teamId! : null;
        this.contentType = data.contentType!;

        if (patch) this.patch(data);
    }

    /**
     * Getter for retrieving the team this channel belongs to if it is cached.
     */
    public get team(): Team | null {
        if (!this.teamID) return null;
        if (!this._team) return this._team;
        const cachedTeam = this.client.teams.cache.get(this.teamID);
        if (!cachedTeam) return null;
        this._team = cachedTeam;
        return cachedTeam;
    }

    /**
     * Update the data in this structure.
     * @internal
     */
    public patch(data: Partial<APITeamChannel | APIDMChannel>): this {
        return this;
    }

    /**
     * Send a message to this channel.
     * @param content Either a string content or RichEmbed to send to this channel.
     * @param embed A RichEmbed to send to this channel.
     */
    public send(content: string | Embed, embed?: Embed): Promise<Message | string> {
        if (this.contentType !== 'chat') {
            throw new TypeError('This channel cannot have messages sent to it. It is not a chat channel.');
        }
        return this.client.channels.sendMessage(this, content, embed);
    }
}

/**
 * A channel between the client user and an other user(s) in DMs.
 */
export class DMChannel extends PartialChannel {
    /**
     * The type of this channel.
     * @defaultValue "DM"
     * @readonly
     */
    public readonly type: CHANNEL_TYPES = 'DM';

    /**
     * The name of the channel (group channels?).
     */
    public name: string | null;

    /**
     * The description of the channel (group channels?).
     */
    public description!: string | null;

    /**
     * The users that belong in this channel, including the client.
     * @readonly
     */
    public readonly users: Collection<string, User | APIUser>;

    /**
     * Latest date this channel was updated.
     */
    public updatedAt: Date | null;

    /**
     * The type of the content in this channel ("chat", "voice", "etc").
     * @readonly
     */
    public readonly contentType: CHANNEL_CONTENT_TYPES;

    /**
     * Date this channel was archived.
     */
    public archivedAt: Date | null;

    /**
     * Date this channel will auto archive.
     */
    public autoArchiveAt: Date | null;

    /**
     * The ID of the parent channel.
     */
    public parentChannelID: string | null;

    /**
     * Date this channel was deleted.
     */
    public deletedAt: Date | null;

    /**
     * The webhook that created this channel.
     * @readonly
     */
    public readonly createdByWebhookID: string | null;

    /**
     * The type of this dm channel (???)
     * @readonly
     */
    public readonly dmType = 'Default';

    /**
     * The ID of the owner of this channel
     * @readonly
     */
    public readonly ownerID: string;

    /**
     * The manager in charge of the messages sent in this channel.
     * @readonly
     */
    public readonly messages: MessageManager;

    /**
     * The current participants in a voice call within this channel.
     */
    public voiceParticipants: APIUser[];

    public constructor(client: Client, data: APIDMChannel) {
        super(client, data, null, false);
        this.contentType = data.contentType;
        this.createdByWebhookID = data.createdByWebhookId;
        this.ownerID = data.ownerId;
        this.updatedAt = null;
        this.name = null;
        this.archivedAt = null;
        this.autoArchiveAt = null;
        this.users = new Collection<string, User>();
        this.parentChannelID = null;
        this.deletedAt = null;
        this.voiceParticipants = [];
        this.messages = new MessageManager(this.client, this);
        this.patch(data);
    }

    public patch(data: APIDMChannel | Partial<APIDMChannel>): this {
        if ('name' in data && data.name !== undefined) this.name = data.name ?? null;
        if ('description' in data && data.description !== undefined) this.description = data.description;
        if ('users' in data && data.users !== undefined) {
            for (const user of data.users) {
                this.users.set(user.id, this.client.users.cache.get(user.id) ?? user);
            }
        }
        if ('updatedAt' in data && data.updatedAt !== undefined) {
            this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        }
        if ('archivedAt' in data && data.archivedAt !== undefined) {
            this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null;
        }
        if ('autoArchiveAt' in data && data.autoArchiveAt !== undefined) {
            this.autoArchiveAt = data.autoArchiveAt ? new Date(data.autoArchiveAt) : null;
        }
        if ('parentChannelId' in data && data.parentChannelId !== undefined) {
            this.parentChannelID = data.parentChannelId ?? null;
        }
        if ('deletedAt' in data && data.deletedAt !== undefined) {
            this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        }
        if ('voiceParticipants' in data && data.voiceParticipants !== undefined) {
            this.voiceParticipants = data.voiceParticipants;
        }
        return this;
    }
}

/**
 * A channel residing in a Team
 */
export class TeamChannel extends PartialChannel {
    /**
     * The type of this channel.
     * @defaultValue "Team"
     * @readonly
     */
    public readonly type = 'Team';

    /**
     * Latest date this channel was updated.
     */
    public updatedAt: Date | null;

    /**
     * The name of the channel (group channels?).
     */
    public name!: string;

    /**
     * The type of the content in this channel ("chat", "voice", "etc").
     * @readonly
     */
    public readonly contentType!: CHANNEL_CONTENT_TYPES;

    /**
     * Date this channel was archived.
     */
    public archivedAt: Date | null;

    /**
     * Date this channel will auto archive.
     */
    public autoArchiveAt: Date | null;

    /**
     * The ID of the parent channel.
     */
    public parentChannelID: string | null;

    /**
     * Date this channel was deleted.
     */
    public deletedAt: Date | null;

    /**
     * The ID of the user who archived this channel.
     */
    public archivedByID: string | null;

    /**
     * The description of this channel.
     */
    public description: string | null;

    /**
     * The ID of the webhook that created this channel.
     */
    public createdByWebhookID: string | null;

    /**
     * The ID of the webhook that archived this channel.
     */
    public archivedByWebhookID!: string | null;

    /**
     * The ID of the team this channel belongs to.
     */
    public teamID: string;

    /**
     * The ID of the category this channel belongs to.
     */
    public channelCategoryID: string | null;

    /**
     * Date this channel was added (??).
     */
    public addedAt: Date | null;

    /**
     * Whether the roles are synced (with discord?).
     */
    public roleSynced: boolean | null;

    /**
     * The role permission overwrites that belong to this channel.
     */
    public roles: Collection<string, Role | RolePermissionOverwrite>;

    /**
     * Array of role IDs that have an overwrite in this channel.
     */
    public roleIDs: string[];

    /**
     * Array of tournament role IDs.
     */
    public tournamentRoleIDs: string[];

    /**
     * Array of IDs belonging to users that have an overwrite in this channel.
     */
    public userPermissions: string[];

    /**
     * Tournament roles.
     */
    public tournamentRoles: Collection<string, Role | RolePermissionOverwrite>;

    /**
     * Whether this channel can be seen without joining the Team/Group.
     */
    public public!: boolean;

    /**
     * Position of the group.
     */
    public priority!: number;

    /**
     * The ID of the group this channel belongs to
     */
    public groupID!: string;

    /**
     * The type of the group this channel belongs to
     */
    public groupType!: string;

    /**
     * The manager in charge of messages sent in this channel ONLY IF THIS CHANNEL SUPPORTS MESSAGES
     */
    public readonly messages: MessageManager | null;

    public constructor(client: Client, data: APITeamChannel, _team: Team | null, private _group: Group | null) {
        super(client, data, _team, false);
        this.messages = data.contentType === 'chat' ? new MessageManager(this.client, this) : null;
        this.teamID = _team?.id ?? data.teamId;
        this.updatedAt = null;
        this.archivedAt = null;
        this.autoArchiveAt = null;
        this.parentChannelID = null;
        this.deletedAt = null;
        this.archivedByID = null;
        this.description = null;
        this.createdByWebhookID = data.createdByWebhookId ?? null;
        this.channelCategoryID = null;
        this.addedAt = null;
        this.roleSynced = null;
        this.roles = new Collection();
        this.tournamentRoles = new Collection();
        this.userPermissions = [];
        this.tournamentRoleIDs = [];
        this.roleIDs = [];

        this.patch(data);
    }

    /**
     * The group object this channel belongs to, if cached.
     */
    public get group(): Group | null {
        return this._group ?? this.team?.groups.cache.get(this.groupID.toString()) ?? null;
    }

    public patch(data: APITeamChannel | Partial<APITeamChannel>): this {
        if ('name' in data && data.name !== undefined) this.name = data.name ?? null;
        if ('description' in data && data.description !== undefined) this.description = data.description;
        if ('updatedAt' in data && data.updatedAt !== undefined) {
            this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        }
        if ('archivedAt' in data && data.archivedAt !== undefined) {
            this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null;
        }
        if ('autoArchiveAt' in data && data.autoArchiveAt !== undefined) {
            this.autoArchiveAt = data.autoArchiveAt ? new Date(data.autoArchiveAt) : null;
        }
        if ('isPublic' in data && data.isPublic !== undefined) this.public = data.isPublic;
        if ('priority' in data && data.priority !== undefined) this.priority = data.priority;
        if ('groupId' in data && data.groupId !== undefined) this.groupID = data.groupId.toString();
        if ('parentChannelId' in data && data.parentChannelId !== undefined) {
            this.parentChannelID = data.parentChannelId;
        }
        if ('archivedBy' in data && data.archivedBy !== undefined) this.archivedByID = data.archivedBy;
        if ('archivedByWebhookId' in data && data.archivedByWebhookId !== undefined) {
            this.archivedByWebhookID = data.archivedByWebhookId;
        }
        if ('channelCategoryId' in data && data.channelCategoryId !== undefined) {
            this.channelCategoryID = data.channelCategoryId;
        }
        if ('deletedAt' in data && data.deletedAt !== undefined) {
            this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        }
        if ('addedAt' in data && data.addedAt !== undefined) {
            this.addedAt = data.addedAt ? new Date(data.addedAt) : null;
        }
        if ('isRoleSynced' in data && data.isRoleSynced !== undefined) this.roleSynced = data.isRoleSynced;
        if ('rolesById' in data && data.rolesById !== undefined) {
            for (const role in data.rolesById) {
                const ROLE_DATA = data.rolesById[role];
                this.roles.set(role, new RolePermissionOverwrite(this.client, ROLE_DATA, this));
            }
        }
        if ('userPermissions' in data && data.userPermissions !== undefined) {
            this.userPermissions = data.userPermissions ?? [];
        }
        if ('roles' in data && data.roles !== undefined) this.roleIDs = data.roles ?? [];
        if ('tournamentRoles' in data && data.tournamentRoles !== undefined) {
            this.tournamentRoleIDs = data.tournamentRoles ?? [];
        }
        if ('tournamentRolesById' in data && data.tournamentRolesById !== undefined) {
            for (const role in data.tournamentRolesById) {
                const ROLE_DATA = data.tournamentRolesById[role];
                this.tournamentRoles.set(role, new RolePermissionOverwrite(this.client, ROLE_DATA, this));
            }
        }
        return this;
    }
}
