export interface DenyPermissions {
    [key: string]: number;
}

export interface AllowPermissions {
    [key: string]: number;
}

export interface APITeamChannelUserOverwrite {
    teamId: string;
    channelId: string;
    createdAt: string;
    updatedAt: string | null;
    teamRoleId: number;
    denyPermissions: DenyPermissions;
    allowPermissions: AllowPermissions;
}

export interface APITeamChannelRoleOverwrite {
    teamId: string;
    createdAt: string;
    updatedAt: string;
    teamRoleId: number;
    denyPermissions: DenyPermissions;
    allowPermissions: AllowPermissions;
    channelCategoryId: number;
}
