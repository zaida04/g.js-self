import { APIUser } from './User';
import { PartialMessage } from './Message';
import { ChannelRolesByID } from '../responses/FetchTeamChannels';
import { TeamChannelRoleOverwrite } from './TeamChannelRoleOverwrite';

export interface DMChannel {
    id: string;
    type: string;
    name: string | null;
    description: string | null;
    users: APIUser[];
    DMType: string;
    lastMessage: PartialMessage;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    contentType: string;
    archivedAt: string | null;
    parentChannelId: string | null;
    autoArchiveAt: string | null;
    deletedAt: string | null;
    archivedBy: string | null;
    createdByWebhookId: string | null;
    archivedByWebhookId: string | null;
    dmType: string;
    ownerId: string;
    voiceParticipants: any[];
}

export interface TeamChannel {
    priority: number | null;
    id: string;
    type: string;
    name: string;
    description: string | null;
    settings: string | null;
    roles: string | null;
    rolesById: ChannelRolesByID;
    tournamentRolesById: TeamChannelRoleOverwrite;
    teamId: string;
    channelCategoryId: number;
    addedAt: string;
    channelId: string;
    isRoleSynced: boolean;
    isPublic: boolean;
    groupId: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    contentType: string;
    archivedAt: string | null;
    parentChannelId: string | null;
    autoArchiveAt: string | null;
    deletedAt: string | null;
    archivedBy: string | null;
    createdByWebhookId: string | null;
    archivedByWebhookId: string | null;
    userPermissions: string | null;
    tournamentRoles: string | null;
    voiceParticipants?: any[];
    userStreams?: any[];
}

export interface Category {
    id: number;
    name: string;
    priority: number;
    roles: null;
    rolesById: {
        [key: string]: TeamChannelRoleOverwrite;
    };
    teamId: string;
    createdAt: string;
    updatedAt: null;
    groupId: string;
    channelCategoryId: null;
    userPermissions: null;
}
