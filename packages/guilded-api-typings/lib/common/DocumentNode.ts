import { APINestedNode } from './NestedNode';

export interface APIDocumentNode {
    data: {
        language?: string;
    };
    type: string;
    nodes: APINestedNode[];
    object: string;
}
