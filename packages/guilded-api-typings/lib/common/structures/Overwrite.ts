export interface DenyPermissions {
    [key: string]: number;
}

export interface AllowPermissions {
    [key: string]: number;
}

export interface APIRoleOverwrite {
    teamId: string;
    createdAt: string;
    updatedAt: string | null;
    teamRoleId: number;
    denyPermissions: DenyPermissions;
    allowPermissions: AllowPermissions;
    channelId?: string;
    channelCategoryId?: number;
}

export type APIUserOverwrite = APIRoleOverwrite;

export type APICategoryChannelRoleOverwrite = APIRoleOverwrite;

export type APITeamChannelRoleOverwrite = APIRoleOverwrite;
