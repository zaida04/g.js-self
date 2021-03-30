import type { APIGroup } from "@guildedjs/guilded-api-typings";
import {Base} from "./Base";
import type { Client } from "./Client";
import {TeamGroupChannelManager} from "./managers/TeamGroupChannelManager";
import type {Team} from "./Team";

/**
 * A group residing within a Team that contains channels
 */
export class Group extends Base<APIGroup> {
    
    /**
     * The channels that belong to this group
     */
    public readonly channels: TeamGroupChannelManager;
    public name!: string;
    public description: string | null;
    public priority: string | null;
    public type: string;
    public avatar: string | null;
    public banner: string | null;
    public teamID: string;
    public gameID: string | null;
    public visibilityTeamRoleID: number;
    public membershipTeamRoleID: number;
    public isBase!: boolean;
    public readonly createdByID: string | null;
    public readonly createdAt: Date;
    public updatedBy: string | null;
    public updatedAt: Date | null;
    public deletedAt: Date | null;
    public customReactionID: string | null;
    public public!: boolean;
    public archivedAt: Date | null;
    public archivedBy: string | null;

    public constructor(client: Client, data: APIGroup, public team: Team | null) {
        super(client, data);
        this.channels = new TeamGroupChannelManager(this.client, this);
        this.description = null;
        this.priority = null;
        this.type = data.type;
        this.avatar = null;
        this.banner = null;
        this.teamID = data.teamId;
        this.gameID = null;
        this.visibilityTeamRoleID = data.visibilityTeamRoleId;
        this.membershipTeamRoleID = data.membershipTeamRoleId;
        this.createdByID = data.createdBy
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = null;
        this.updatedBy = null;
        this.deletedAt = null;   
        this.customReactionID = null;
        this.archivedAt = null;
        this.archivedBy = null;     

        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIGroup | Partial<APIGroup>) {
        if("name" in data && data.name !== undefined) this.name = data.name;
        if("description" in data && data.description !== undefined) this.description = data.description;
        if("priority" in data && data.priority !== undefined) this.priority = data.priority;
        if("type" in data && data.type !== undefined) this.type = data.type;
        if("avatar" in data && data.avatar !== undefined) this.avatar = data.avatar;
        if("banner" in data && data.banner !== undefined) this.banner = data.banner;
        if("updatedBy" in data && data.updatedBy !== undefined) this.updatedBy = data.updatedBy ?? null;
        if("updatedAt" in data && data.updatedAt !== undefined) this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        if("deletedAt" in data && data.deletedAt !== undefined) this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        if("customReactionId" in data && data.customReactionId !== undefined) this.customReactionID = data.customReactionId;
        if("isPublic" in data && data.isPublic !== undefined) this.public = data.isPublic;
        if("archivedAt" in data && data.archivedAt !== undefined) this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null;
        if("archivedBy" in data && data.archivedBy !== undefined) this.archivedBy = data.archivedBy ?? null;
        return this;
    }
}