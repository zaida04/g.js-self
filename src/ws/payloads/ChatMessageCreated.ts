import { APIContent } from '../../common/Content';

export interface ChatMessageCreated {
    type: 'ChatMessageCreated';
    id: string;
    channelCategoryId: number;
    channelId: string;
    channelType: string;
    contentId: string;
    contentType: string;
    createdAt: string;
    createdBy: string;
    guildedClientId: string;
    content: APIContent;
    silenceNotification: boolean;
    teamId?: string | null;
}
