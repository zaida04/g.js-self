import { NestedNode } from './NestedNode';

export interface DocumentNode {
    data: unknown;
    type: string;
    nodes: NestedNode[];
    object: string;
}
