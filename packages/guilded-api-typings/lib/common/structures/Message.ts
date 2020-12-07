import { APIContent } from '../Content';

export interface APIMessage {
    botId?: string | null;
    channelId: string;
    content: APIContent;
    createdAt: string;
    createdBy: string;
    deletedAt?: string | null;
    editedAt?: string | null;
    id: string;
    isPinned?: boolean;
    pinnedBy?: string | null;
    reactions?: any[];
    teamId?: string | null;
    type: string;
    webhookId?: string | null;
}

export type APIContentMessageType = 'block' | 'text';
export type DocumentNodeMessageType = 'code-container' | 'paragraph';
