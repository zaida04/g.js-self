import { APIDocumentNode } from './DocumentNode';

export interface APIDocument {
    data: unknown;
    nodes: APIDocumentNode[];
    object: string;
}
