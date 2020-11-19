import { APIMessage } from '../common';
export interface ChatMessageCreated {
    type: 'ChatMessageCreated';
    teamId?: string | null;
    silenceNotification: boolean;
    id: string;
    guildedClientId: string;
    createdBy: string;
    createdAt: string;
    contentType: string;
    contentId: string;
    message: Pick<APIMessage, 'id' | 'createdBy' | 'content' | 'type' | 'createdAt'>;
    channelType: string;
    channelId: string;
    channelCategoryId: number;
}
