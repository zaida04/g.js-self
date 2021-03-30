import { APITeamChannelRolePermissionOverwrite, RolePermissions } from "@guildedjs/guilded-api-typings";
import { TeamChannel } from "./Channel";
import { Client } from "./Client";

export default class RolePermissionOverwrite {
    public readonly teamID: string;
    public readonly channelID: string;
    public readonly createdAt: Date;
    public readonly updatedAt: Date | null;
    public readonly teamRoleID: string;
    public readonly denyPermissions: RolePermissions;
    public readonly allowPermissions: RolePermissions;
    
    public constructor(public client: Client, data: APITeamChannelRolePermissionOverwrite, public channel: TeamChannel) { 
        this.teamID = data.teamId;
        this.channelID = data.channelId;
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        this.teamRoleID = data.teamRoleId.toString();
        this.denyPermissions = data.denyPermissions;
        this.allowPermissions = data.allowPermissions;
    }
}