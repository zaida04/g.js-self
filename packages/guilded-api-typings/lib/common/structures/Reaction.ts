export interface APICustomReaction {
    id: number;
    name: string;
    png: string | null;
    webp: string | null;
    apng: string | null;
}

export interface APIMessageReaction {
    customReactionId: number;
    createdAt: string;
    users: {
        id: string;
        webhookId: string | null;
        botId: string | null;
    }[];
    customReaction: APICustomReaction;
}

export interface APIReactionUsage {
    id: number;
    total: number;
}
