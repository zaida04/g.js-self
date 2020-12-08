import { APIMessage } from './Message';
import { APICategoryChannelRoleOverwrite, APITeamChannelRoleOverwrite } from './Overwrite';
import { RoleOverwriteById } from './Role';
import { APIUser } from './User';

// Base data that ALL channels will have.
export interface APIChannel {
    id: string | number;
    name: string | null;
    createdAt: string;
    updatedAt: string | null;
}

// Base data that channels that you can send TEXT to will have
export interface APITextBasedChannel extends APIChannel {
    archivedAt: string | null;
    archivedBy: string | null;
    archivedByWebhookId: string | null;
    contentType: string;
    createdByWebhookId: string | null;
    deletedAt: string | null;
    description: string | null;
    parentChannelId: string | null;
    autoArchiveAt: string | null;
    type: string;
    voiceParticipants: any[];
}

// Base data that channels in a TEAM will have
export interface APITeamBasedChannel {
    channelCategoryId: number | null;
    teamId: string;
    groupId: string;
    roles: string[] | null;
    priority: number | null;
    userPermissions: string[] | null;
    createdBy: string;
}

export interface APIDMChannel extends APITextBasedChannel {
    dmType: string;
    lastMessage: APIMessage;
    ownerId: string;
    parentChannelId: string | null;
    users: APIUser[];
}

export interface APITeamChannel extends APITeamBasedChannel, APITextBasedChannel {
    name: string;
    addedAt: string;
    channelId: string;
    isPublic: boolean;
    isRoleSynced: boolean;
    rolesById: { [key: string]: APITeamChannelRoleOverwrite };
    settings: string | null;
    tournamentRoles: string | null;
    tournamentRolesById: RoleOverwriteById;
    userStreams?: any[];
}

export interface APICategory extends APITeamBasedChannel, APIChannel {
    channelCategoryId: number;
    name: string;
    rolesById: { [key: string]: APICategoryChannelRoleOverwrite };
}
