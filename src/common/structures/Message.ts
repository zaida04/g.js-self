import { APIContent } from '../Content';

export interface Message {
    id: string;
    content: APIContent;
    type: string;
    reactions?: any[];
    createdBy: string;
    createdAt: Date;
    editedAt: string | null;
    deletedAt: string | null;
    channelId?: string | null;
    teamId?: string | null;
    webhookId: string | null;
    botId: string | null;
    isPinned?: boolean;
    pinnedBy?: string | null;
}
