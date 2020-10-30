import { Message } from './Message';
import { RoleOverwriteById } from './RolesById';
import { User } from './User';

export interface DMChannel {
    id: string;
    type: string;
    name: string | null;
    description: string | null;
    users: User[];
    DMType: string;
    lastMessage: Message;
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
    addedAt: string;
    archivedAt: string | null;
    archivedBy: string | null;
    archivedByWebhookId: string | null;
    autoArchiveAt: string | null;
    channelCategoryId: number;
    channelId: string;
    contentType: string;
    createdAt: string;
    createdBy: string;
    createdByWebhookId: string | null;
    deletedAt: string | null;
    description: string | null;
    groupId: string;
    id: string;
    isPublic: boolean;
    isRoleSynced: boolean;
    name: string;
    parentChannelId: string | null;
    priority: number | null;
    roles: string | null;
    rolesById: RoleOverwriteById;
    settings: string | null;
    teamId: string;
    tournamentRoles: string | null;
    tournamentRolesById: RoleOverwriteById;
    type: string;
    updatedAt: string;
    userPermissions: string | null;
    userStreams?: any[];
    voiceParticipants?: any[];
}

export interface Category {
    channelCategoryId: string | null;
    createdAt: string;
    groupId: string;
    id: number;
    name: string;
    priority: number;
    roles: string[] | null;
    rolesById: RoleOverwriteById;
    teamId: string;
    updatedAt: string | null;
    userPermissions: string | null;
}
