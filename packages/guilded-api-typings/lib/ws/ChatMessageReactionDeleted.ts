import { CHANNEL_CONTENT_TYPES, CHANNEL_TYPES } from '../common';

export interface WSChatMessageReactionDeleted {
    type: 'ChatMessageReactionDeleted';
    guildedClientId: string;
    channelId: string;
    channelCategoryId: string | null;
    channelType: CHANNEL_TYPES;
    teamId: string | null;
    contentType: CHANNEL_CONTENT_TYPES;
    reaction: {
        customReactionId: number;
        createdBy: string;
    };
    message: {
        id: string;
    };
}
