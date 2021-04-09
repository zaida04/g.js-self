import { APITeamChannelRolePermissionOverwrite, RolePermissions } from '@guildedjs/guilded-api-typings';

import { TeamChannel } from './Channel';
import { Client } from './Client';

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
