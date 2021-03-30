export interface APILeaf {
    text: string;
    marks: APIMark[];
    object: 'leaf' | string;
}

export interface APIMark {
    data: unknown;
    type: string;
    object: string;
}
