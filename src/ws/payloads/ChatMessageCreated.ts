import { APIContent } from '../../common/Content';

export interface ChatMessageCreated {
    type: 'ChatMessageCreated';
    guildedClientId: string;
    channelId: string;
    channelCategoryId: number;
    channelType: string;
    teamId?: string | null;
    contentType: string;
    message: APIContent;
    createdAt: string;
    contentId: string;
    createdBy: string;
    silenceNotification: boolean;
}
