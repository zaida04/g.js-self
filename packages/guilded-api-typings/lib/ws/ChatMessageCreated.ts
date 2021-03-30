import { APIMessage, CHANNEL_CONTENT_TYPES, CHANNEL_TYPES } from '../common';
export interface WSChatMessageCreated {
    channelCategoryId?: string | null;
    channelId: string;
    channelType: CHANNEL_TYPES;
    contentId: string;
    contentType: CHANNEL_CONTENT_TYPES;
    createdAt: string;
    createdBy: string;
    guildedClientId: string;
    id: string;
    message: Pick<APIMessage, 'id' | 'createdBy' | 'content' | 'type' | 'createdAt' | 'webhookId' | 'botId'>;
    silenceNotification: boolean;
    teamId?: string;
    type: 'ChatMessageCreated';
}
