import { APIMessage } from '../common';
export interface ChatMessageCreated {
    channelCategoryId?: string | null;
    channelId: string;
    channelType: string;
    contentId: string;
    contentType: string;
    createdAt: string;
    createdBy: string;
    guildedClientId: string;
    id: string;
    message: Pick<APIMessage, 'id' | 'createdBy' | 'content' | 'type' | 'createdAt' | 'webhookId' | 'botId'>;
    silenceNotification: boolean;
    teamId?: string;
    type: 'ChatMessageCreated';
}
