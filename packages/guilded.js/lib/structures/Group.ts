import type { APIGroup } from '@guildedjs/guilded-api-typings';

import { Base } from './Base';
import type { Client } from './Client';
import { TeamGroupChannelManager } from './managers/TeamGroupChannelManager';
import type { Team } from './Team';

/**
 * A group residing within a Team that contains channels.
 */
export class Group extends Base<APIGroup> {
    /**
     * The channels that belong to this group.
     */
    public readonly channels: TeamGroupChannelManager;

    /**
     * The name of this group.
     */
    public name!: string;

    /**
     * The description of this group.
     */
    public description: string | null;

    /**
     * The position of this group.
     */
    public priority: string | null;

    /**
     * The type of this group.
     */
    public type: string;

    /**
     * The avatar hash of this group.
     */
    public avatar: string | null;

    /**
     * The banner hash of this group.
     */
    public banner: string | null;

    /**
     * The ID of the team this group belongs to.
     * @readonly
     */
    public teamID: string;

    /**
     * The ID of the game this group belongs to.
     */
    public gameID: string | null;

    /**
     * The role required to see this group.
     */
    public visibilityTeamRoleID: number;

    /**
     * The role required to be considered a member of this group.
     */
    public membershipTeamRoleID: number;

    /**
     * If this is the base group of the team this group belongs to.
     */
    public isBase!: boolean;

    /**
     * The ID of the user that created this group.
     */
    public readonly createdByID: string | null;

    /**
     * Date this group was created on.
     */
    public readonly createdAt: Date;

    /**
     * The ID of the user that last updated this group.
     */
    public updatedBy: string | null;

    /**
     * Date this group was last updated.
     */
    public updatedAt: Date | null;

    /**
     * Date this group was deleted at.
     */
    public deletedAt: Date | null;

    /**
     * ID of the custom reaction tied to this group.
     */
    public customReactionID: string | null;

    /**
     * Whether this group is public or not (can be seen without being a member).
     */
    public public!: boolean;

    /**
     * Date this group was archived at.
     */
    public archivedAt: Date | null;

    /**
     * The ID of the user that archived this group.
     */
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
        this.createdByID = data.createdBy;
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
    public patch(data: APIGroup | Partial<APIGroup>): this {
        if ('name' in data && data.name !== undefined) this.name = data.name;
        if ('description' in data && data.description !== undefined) this.description = data.description;
        if ('priority' in data && data.priority !== undefined) this.priority = data.priority;
        if ('type' in data && data.type !== undefined) this.type = data.type;
        if ('avatar' in data && data.avatar !== undefined) this.avatar = data.avatar;
        if ('banner' in data && data.banner !== undefined) this.banner = data.banner;
        if ('updatedBy' in data && data.updatedBy !== undefined) this.updatedBy = data.updatedBy ?? null;
        if ('updatedAt' in data && data.updatedAt !== undefined) {
            this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        }
        if ('deletedAt' in data && data.deletedAt !== undefined) {
            this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        }
        if ('customReactionId' in data && data.customReactionId !== undefined) {
            this.customReactionID = data.customReactionId;
        }
        if ('isPublic' in data && data.isPublic !== undefined) this.public = data.isPublic;
        if ('archivedAt' in data && data.archivedAt !== undefined) {
            this.archivedAt = data.archivedAt ? new Date(data.archivedAt) : null;
        }
        if ('archivedBy' in data && data.archivedBy !== undefined) this.archivedBy = data.archivedBy ?? null;
        return this;
    }
}
