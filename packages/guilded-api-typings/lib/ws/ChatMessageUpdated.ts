import { APIPartialMessage } from '../common';

export interface WSChatMessageUpdated {
    channelCategoryId: string | null;
    channelId: string;
    channelType: string;
    contentId: string;
    contentType: string;
    guildedClientId: string;
    message: APIPartialMessage;
    silenceNotification: boolean;
    teamId: string;
    type: string;
    updatedBy: string;
}
