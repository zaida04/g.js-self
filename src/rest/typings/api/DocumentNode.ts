import { NestedNode } from './NestedNode';

export interface DocumentNode {
    data: unknown;
    type: DocumentNodeType;
    nodes: NestedNode[];
    object: string;
}

export type DocumentNodeType = 'paragraph';
