export interface APICustomReaction {
    id: number;
    name: string;
    png: string;
    webp: string;
    apng: string | null;
}

export interface APIReactionUsage {
    id: number;
    total: number;
}
