import { APICustomReaction } from '../common';

export interface WSChatMessageReactionAdd {
    type: string;
    guildedClientId: string;
    channelId: string;
    channelCategoryId: string | null;
    channelType: string;
    teamId: string;
    contentType: string;
    reaction: WSReaction;
    message: {
        id: string;
    };
    silenceNotification: boolean;
}

export interface WSReaction {
    customReactionId: number;
    customReaction: APICustomReaction;
    createdBy: string;
}
