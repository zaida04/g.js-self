import { DocumentNode } from './DocumentNode';

export interface Document {
    data: unknown;
    nodes: DocumentNode[];
    object: string;
}
