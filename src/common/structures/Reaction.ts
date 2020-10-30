export interface CustomReaction {
    id: number;
    name: string;
    png: string;
    webp: string;
    apng: string | null;
}

export interface ReactionUsage {
    id: number;
    total: number;
}
