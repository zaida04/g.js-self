import { APIMark } from './Mark';

export interface APILeaf {
    text: string;
    marks: APIMark[];
    object: 'leaf' | string;
}
