import { APIContent } from '../Content';
import { APICustomReaction } from './Emoji';
import { RolePermissions } from './Team';
import { APIUser } from './User';

export interface APIDMChannel {
    id: string;
    type: CHANNEL_TYPES;
    name: string | null;
    description: string | null;
    users: APIUser[];
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    contentType: CHANNEL_CONTENT_TYPES;
    archivedAt: string | null;
    autoArchiveAt: string | null;
    archivedBy: string | null;
    parentChannelId: string | null;
    deletedAt: string | null;
    createdByWebhookId: string | null;
    archivedByWebhookId: string | null;
    dmType: 'Default' | string;
    ownerId: string;
    voiceParticipants: APIUser[];
}

export interface APITeamChannel {
    id: string;
    type: CHANNEL_TYPES;
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    name: string;
    contentType: CHANNEL_CONTENT_TYPES;
    archivedAt: string | null;
    parentChannelId: string | null;
    autoArchiveAt: string | null;
    deletedAt: string | null;
    archivedBy: string | null;
    description: string | null;
    createdByWebhookId: string | null;
    archivedByWebhookId: string | null;
    teamId: string;
    channelCategoryId: string | null;
    addedAt: string | null;
    channelId: string | null;
    isRoleSynced: boolean | null;
    roles: string[] | null;
    userPermissions: string[] | null;
    tournamentRoles: string[] | null;
    isPublic: boolean;
    priority: number;
    groupId: number;
    settings: unknown;
    groupType: string;
    rolesById: {
        [key: string]: APITeamChannelRolePermissionOverwrite;
    };
    tournamentRolesById: {
        [key: string]: APITeamChannelRolePermissionOverwrite;
    };
    createdByInfo: {
        id: string;
        name: string;
        profilePicture: string;
        profilePictureSm: string;
    };
}

export type CHANNEL_TYPES = 'Team' | 'DM';
export type CHANNEL_CONTENT_TYPES = 'chat' | 'voice' | 'forum' | 'doc';

export interface APIMessageReaction {
    customReactionId: number;
    createdAt: string;
    users: {
        id: string;
        webhookId: string | null;
        botId: string | null;
    }[];
    customReaction: APICustomReaction;
}

export interface APIReactionUsage {
    id: number;
    total: number;
}

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

export interface APIMessage {
    id: string;
    content: APIContent;
    type: APIContentMessageType;
    reactions?: APIMessageReaction[];
    createdBy: string;
    createdAt: string;
    editedAt?: string | null;
    deletedAt?: string | null;
    channelId: string;
    repliesToIds: string[];
    repliesTo: string | null;
    webhookId?: string | null;
    botId?: string | null;
    isPinned?: boolean;
    pinnedBy?: string | null;
}

export interface APIMessageMention {
    id: string;
    name: string;
    type: string;
    color: string;
    avatar: string;
    matcher: string;
    nickname: boolean;
    description: string;
}

export type APIPartialMessage = Pick<APIMessage, 'id' | 'content' | 'editedAt'>;

export interface APIEmbed {
    title?: string;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: APIEmbedFooter;
    image?: APIEmbedImage;
    thumbnail?: APIEmbedThumbnail;
    video?: APIEmbedVideo;
    provider?: APIEmbedProvider;
    author?: APIEmbedAuthor;
    fields?: APIEmbedField[];
}

export interface APIEmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
export interface APIEmbedImage {
    url: string;
    proxy_url?: string;
    height?: string;
    width?: string;
}
export type APIEmbedThumbnail = APIEmbedImage;

export type APIEmbedVideo = APIEmbedImage;

export interface APIEmbedProvider {
    name?: string;
    url?: string;
}

export interface APIEmbedAuthor {
    name?: string;
    icon_url?: string;
    url?: string;
    proxy_icon_url?: string;
}
export interface APIEmbedField {
    inline?: boolean;
    name: string;
    value: string;
}

export type APIContentMessageType = 'block' | 'text' | string;
export type DocumentNodeMessageType = 'code-container' | 'paragraph' | string;

export interface APITeamChannelRolePermissionOverwrite {
    teamId: string;
    channelId: string;
    createdAt: string;
    updatedAt: string | null;
    teamRoleId: number;
    denyPermissions: RolePermissions;
    allowPermissions: RolePermissions;
}
