import type {
    APITeamChannelRolePermissionOverwrite,
    APITeamRole,
    RolePermissions,
} from '@guildedjs/guilded-api-typings';

import { retrieveTeamFromStructureCache } from '../util';
import { Base } from './Base';
import type { TeamChannel } from './Channel';
import type { Client } from './Client';
import type { Team } from './Team';

/**
 * A role belonging to a team
 */
export class Role extends Base<APITeamRole> {
    /**
     * Whether this role is mentionable.
     */
    public mentionable!: boolean;

    /**
     * The base permissions this role has.
     */
    public permissions!: RolePermissions;

    /**
     * Whether this role is hoisted or not.
     */
    public hoisted!: boolean;

    /**
     * Discord sync'ed role info.
     */
    public discord: { roleID: string | null; syncedAt: Date | null };

    /**
     * Whether this role is self assignable by others.
     */
    public selfAssignable!: boolean;

    /**
     * Date this role was created on.
     * @readonly
     */
    public readonly createdAt: Date;

    /**
     * ID of the team this role belongs to.
     */
    public readonly teamID: string;

    /**
     * Date this role was last updated on.
     */
    public updatedAt: Date | null;

    /**
     * The position of this role.
     */
    public priority!: number;

    /**
     * The color of this role.
     */
    public color!: string;

    /**
     * The name of this role.
     */
    public name!: string;

    public constructor(client: Client, data: APITeamRole, private _team: Team | null) {
        super(client, data);
        this.discord = { roleID: null, syncedAt: null };
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = null;
        this.teamID = data.teamId;
        this.patch(data);
    }

    public get team(): Team | null {
        return retrieveTeamFromStructureCache({
            _team: this._team,
            client: this.client,
            teamID: this.teamID,
        });
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APITeamRole | Partial<APITeamRole>): this {
        if ('permissions' in data && data.permissions) this.permissions = data.permissions;
        if ('isMentionable' in data && data.isMentionable) this.mentionable = data.isMentionable;
        if ('isDisplayedSeparately' in data && data.isDisplayedSeparately) this.hoisted = data.isDisplayedSeparately;
        if ('discordRoleId' in data && data.discordRoleId !== undefined) this.discord.roleID = data.discordRoleId;
        if ('discordSyncedAt' in data && data.discordSyncedAt !== undefined) {
            this.discord.syncedAt = data.discordSyncedAt ? new Date(data.discordSyncedAt) : null;
        }
        if ('isSelfAssignable' in data && data.isSelfAssignable) this.selfAssignable = data.isSelfAssignable;
        if ('updatedAt' in data && data.updatedAt !== undefined) {
            this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        }
        if ('priority' in data && data.priority) this.priority = data.priority;
        if ('color' in data && data.color) this.color = data.color;
        if ('name' in data && data.name) this.name = data.name;

        return this;
    }
}

/**
 * Object representing permission overwrites for a role on a team channel.
 */
export class RolePermissionOverwrite {
    /**
     * The ID of the team this overwrite belongs to.
     */
    public readonly teamID: string;

    /**
     * The ID of the channel this overwrite belongs to.
     */
    public readonly channelID: string;

    /**
     * Date this overwrite was created on.
     */
    public readonly createdAt: Date;

    /**
     * Date this overwrite was last updated on.
     */
    public readonly updatedAt: Date | null;

    /**
     * The ID of the role this overwrite belongs to.
     */
    public readonly teamRoleID: string;

    /**
     * The permissions this overwrite currently has denied.
     */
    public readonly denyPermissions: RolePermissions;

    /**
     * The permissions this overwrite currently has allowed.
     */
    public readonly allowPermissions: RolePermissions;

    public constructor(
        public client: Client,
        data: APITeamChannelRolePermissionOverwrite,
        public channel: TeamChannel,
    ) {
        this.teamID = data.teamId;
        this.channelID = data.channelId;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        this.teamRoleID = data.teamRoleId.toString();
        this.denyPermissions = data.denyPermissions;
        this.allowPermissions = data.allowPermissions;
    }
}
