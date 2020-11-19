import { APILeaf } from './Leaf';

export interface APINestedNode {
    leaves: APILeaf[];
    object: string;
}
