import { APIContent } from '../Content';
import { APIMessageReaction } from './Reaction';

export interface APIMessage {
    id: string;
    content: APIContent;
    type: APIContentMessageType;
    reactions?: APIMessageReaction[];
    createdBy: string;
    createdAt: string;
    editedAt?: string | null;
    deletedAt?: string | null;
    channelId: string;
    webhookId?: string | null;
    botId?: string | null;
    isPinned?: boolean;
    pinnedBy?: string | null;
}

export interface APIMessageMention {
    id: string;
    name: string;
    type: string;
    color: string;
    avatar: string;
    matcher: string;
    nickname: boolean;
    description: string;
}

export type APIContentMessageType = 'block' | 'text';
export type DocumentNodeMessageType = 'code-container' | 'paragraph';
