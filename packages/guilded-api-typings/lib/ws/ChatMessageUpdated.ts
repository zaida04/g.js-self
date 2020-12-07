import { APIMessage } from '../common';

export interface ChatMessageUpdated {
    channelCategoryId: string | null;
    channelId: string;
    channelType: string;
    contentId: string;
    contentType: string;
    guildedClientId: string;
    message: Pick<APIMessage, 'id' | 'content' | 'editedAt'>;
    silenceNotification: boolean;
    teamId: string;
    type: string;
    updatedBy: string;
}
