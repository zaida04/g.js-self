import { DocumentNode } from './DocumentNode';
import { NestedNode } from './NestedNode';

export interface Document {
    data: unknown;
    nodes: DocumentNode[] | NestedNode[];
    object: string;
}
