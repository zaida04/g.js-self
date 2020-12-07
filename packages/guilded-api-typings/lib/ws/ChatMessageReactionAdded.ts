import { APICustomReaction } from '../common';

export interface ChatMessageReactionAdd {
    type: string;
    guildedClientId: string;
    channelId: string;
    channelCategoryId: string | null;
    channelType: string;
    teamId: string;
    contentType: string;
    reaction: {
        customReactionId: number;
        customReaction: APICustomReaction;
        createdBy: string;
    };
    message: {
        id: string;
    };
    silenceNotification: boolean;
}
