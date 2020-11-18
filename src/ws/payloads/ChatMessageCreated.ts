import { APIContent } from '../../common/Content';
import { MessageData } from './MessageData';

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
    message: MessageData;
    channelType: string;
    channelId: string;
    channelCategoryId: number;
}
