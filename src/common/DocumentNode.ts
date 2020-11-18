import { NestedNode } from './NestedNode';

export interface DocumentNode {
    data: unknown;
    type: MessageNodeContentType | MessageNodeInlineType | string;
    nodes: NestedNode[];
    object: string;
}

export type MessageNodeContentType = 'paragraph' | 'markdown-plain-text' | 'webhookMessage' | 'block-quote-container';
export type MessageNodeInlineType = 'mention' | 'channel' | 'reaction';
export type MessageNodeInlineMention = 'mention' | 'channel';
