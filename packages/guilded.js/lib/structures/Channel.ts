import Collection from "@discordjs/collection";
import type { APITeamChannel, APIDMChannel, APIUser, CHANNEL_CONTENT_TYPES, APITeamRole } from "@guildedjs/guilded-api-typings";
import { Client } from "./Client";
import type { BaseData } from "../typings/BaseData";
import {Base} from "./Base";
import type {Group} from "./Group";
import {MessageManager} from "./managers/MessageManager";
import type {Message} from "./Message";
import type {Role} from "./Role";
import type {Team} from "./Team";
import type {User} from "./User";
import type {ConvertToMessageFormat} from "../util"
import {RolePermissionOverwrite} from "./PermissionOverwrite";

/**
 * A partial channel, not enough data received however to construct a full channel type object.
 */
 export class PartialChannel extends Base<BaseData> {

    /**
     * The messages belonging to this channel
     */
    public readonly messages: MessageManager | null;
    public teamID: string | null;
    public readonly type: string;
    public readonly contentType: string;
    public readonly createdAt: Date;
    public readonly createdBy: string;

    public constructor(client: Client, data: Partial<APITeamChannel | APIDMChannel>, private _team: Team | null, patch = true) {
        super(client, data as { id: string });
        this.teamID = _team?.id ?? ("teamId" in data && data.teamId ? data.teamId : null) ?? null;
        this.messages = new MessageManager(this.client, this);
        this.createdAt = new Date(data.createdAt!);
        this.createdBy = data.createdBy!;
        this.type = data.type!;
        this.contentType = data.contentType!;
        
        if(patch) this.patch(data);
    }

    get team(): Team | null {
        if(!this.teamID) return null;
        if(!this._team) return this._team;
        const cachedTeam = this.client.teams.cache.get(this.teamID);
        if(!cachedTeam) return null;        
        this._team = cachedTeam;
        return cachedTeam;
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: Partial<APITeamChannel | APIDMChannel>) {
        if(!this.teamID && "teamId" in data && data.teamId) this.teamID = data.teamId;

        return this;
    }

    /**
     * Send a message to this channel, hoping that it's a text channel
     */
    public send(...args: Parameters<typeof ConvertToMessageFormat>): Promise<Message | string> {
        return this.client.channels.sendMessage(this, ...args);
    }
}

/**
 * A channel between the client user and an other user(s) in DMs
 */
 export class DMChannel extends PartialChannel {
    public type = "dm";
    public name: string | null;
    public description!: string | null;
    public users: Collection<string, User | APIUser>;
    public updatedAt: Date | null;
    public readonly contentType: CHANNEL_CONTENT_TYPES;
    public archivedAt: Date | null;
    public autoArchiveAt: Date | null;
    public parentChannelID: string | null;
    public deletedAt: Date | null;
    public readonly createdByWebhookID: string | null;
    public readonly dmType = "Default";
    public readonly ownerID: string;
    public readonly messages: MessageManager;
    public voiceParticipants: APIUser[];

    constructor(client: Client, data: APIDMChannel) {
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
        if("name" in data && data.name !== undefined) this.name = data.name ?? null;
        if("description" in data && data.description !== undefined) this.description = data.description;
        if("users" in data && data.users !== undefined) {
            for(const user of data.users) {
                this.users.set(user.id, this.client.users.cache.get(user.id) ?? user);
            }
        }
        if("updatedAt" in data && data.updatedAt !== undefined) this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        if("archivedAt" in data && data.archivedAt !== undefined) this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null;
        if("autoArchiveAt" in data && data.autoArchiveAt !== undefined) this.autoArchiveAt = data.autoArchiveAt ? new Date(data.autoArchiveAt) : null;
        if("parentChannelId" in data && data.parentChannelId !== undefined) this.parentChannelID = data.parentChannelId ?? null;
        if("deletedAt" in data && data.deletedAt !== undefined) this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        if("voiceParticipants" in data && data.voiceParticipants !== undefined) this.voiceParticipants = data.voiceParticipants;   
        return this;
    }

}

/**
 * A channel between the client user and an other user(s) in DMs
 */
 export class TeamChannel extends PartialChannel {
    public readonly type = "Team";
    public updatedAt: Date | null;
    public name!: string;
    public readonly contentType!: CHANNEL_CONTENT_TYPES;
    public archivedAt: Date | null;
    public autoArchiveAt: Date | null;
    public parentChannelID: string | null;
    public deletedAt: Date | null;
    public archivedByID: string | null;
    public description: string | null;
    public createdByWebhookID: string | null;
    public archivedByWebhookID!: string | null;
    public teamID: string;
    public channelCategoryID: string | null;
    public addedAt:  Date | null;
    public roleSynced: boolean | null;
    public roles: Collection<string, Role | RolePermissionOverwrite>;
    public roleIDs: string[];
    public tournamentRoleIDs: string[];
    public userPermissions: string[];
    public tournamentRoles: Collection<string, Role | RolePermissionOverwrite>;
    public public!: boolean;
    public priority!: number;
    public groupID!: string;
    public groupType!: string;
    public readonly messages: MessageManager | null;

    constructor(client: Client, data: APITeamChannel, _team: Team | null, private _group: Group | null) {
        super(client, data, _team, false);
        this.messages = data.contentType === "chat" ? new MessageManager(this.client, this) : null;
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



    get group(): Group | null {
        return this._group ?? this.team?.groups.cache.get(this.groupID.toString()) ?? null
    }

    public patch(data: APITeamChannel | Partial<APITeamChannel>): this {
        if("name" in data && data.name !== undefined) this.name = data.name ?? null;
        if("description" in data && data.description !== undefined) this.description = data.description;
        if("updatedAt" in data && data.updatedAt !== undefined) this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        if("archivedAt" in data && data.archivedAt !== undefined) this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null;
        if("autoArchiveAt" in data && data.autoArchiveAt !== undefined) this.autoArchiveAt = data.autoArchiveAt ? new Date(data.autoArchiveAt) : null;
        if("isPublic" in data && data.isPublic !== undefined) this.public = data.isPublic;
        if("priority" in data && data.priority !== undefined) this.priority = data.priority;
        if("groupId" in data && data.groupId !== undefined) this.groupID = data.groupId.toString();        
        if("parentChannelId" in data && data.parentChannelId !== undefined) this.parentChannelID = data.parentChannelId;
        if("archivedBy" in data && data.archivedBy !== undefined) this.archivedByID = data.archivedBy;
        if("archivedByWebhookId" in data && data.archivedByWebhookId !== undefined) this.archivedByWebhookID = data.archivedByWebhookId;
        if("channelCategoryId" in data && data.channelCategoryId !== undefined) this.channelCategoryID = data.channelCategoryId;
        if("deletedAt" in data && data.deletedAt !== undefined) this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        if("addedAt" in data && data.addedAt !== undefined) this.addedAt = data.addedAt ? new Date(data.addedAt) : null;
        if("isRoleSynced" in data && data.isRoleSynced !== undefined) this.roleSynced = data.isRoleSynced;
        if("rolesById" in data && data.rolesById !== undefined) {
            for(const role in data.rolesById) {
                const role_data = data.rolesById[role];
                this.roles.set(role, new RolePermissionOverwrite(this.client, role_data , this));
            }
        }
        if("userPermissions" in data && data.userPermissions !== undefined) this.userPermissions = data.userPermissions ?? [];
        if("roles" in data && data.roles !== undefined) this.roleIDs = data.roles ?? [];
        if("tournamentRoles" in data && data.tournamentRoles !== undefined) this.tournamentRoleIDs = data.tournamentRoles ?? [];
        if("tournamentRolesById" in data && data.tournamentRolesById !== undefined){
            for(const role in data.tournamentRolesById) {
                const role_data = data.tournamentRolesById[role];
                this.tournamentRoles.set(role, new RolePermissionOverwrite(this.client, role_data, this));
            }
        }
        return this;
    }
}