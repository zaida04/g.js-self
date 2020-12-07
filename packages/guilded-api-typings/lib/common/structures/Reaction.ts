export interface APICustomReaction {
    id: number;
    name: string;
    png: string | null;
    webp: string | null;
    apng: string | null;
}

export interface APIReactionUsage {
    id: number;
    total: number;
}
