import { MessageData } from './MessageData';

export interface ChatMessageCreated {
    type: 'ChatMessageCreated';
    guildedClientId: string;
    channelId: string;
    channelCategoryId: number;
    channelType: string;
    teamId: string;
    contentType: string;
    message: MessageData;
    createdAt: string;
    contentId: string;
    createdBy: string;
    silenceNotification: boolean;
}
