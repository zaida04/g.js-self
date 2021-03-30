import { APILeaf } from './Plant';

export interface APIDocument {
    data: unknown;
    nodes: APIDocumentNode[];
    object: string;
}

export interface APIDocumentNode {
    data: unknown;
    type: string;
    nodes: APINestedNode[];
    object: string;
}

export interface APINestedNode {
    leaves?: APILeaf[];
    object: string;
    data?: unknown;
    type?: string;
    nodes?: APINestedNode[];
}
