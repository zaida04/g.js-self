import { APINestedNode } from './NestedNode';

export interface APIDocumentNode {
    data: unknown;
    type: string;
    nodes: APINestedNode[];
    object: string;
}
