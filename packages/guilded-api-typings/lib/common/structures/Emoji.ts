export interface APICustomReaction {
    id: number;
    name: string;
    png: string | null;
    webp: string | null;
    apng: string | null;
}

export interface APIEmoji {
    id: number;
    name: string;
    createdBy: string;
    createdAt: string;
    png: string;
    webp: string;
    apng: string;
    aliases: string[];
    teamId: string;
    isDeleted: boolean;
    discordEmojiId: string | null;
    discordSyncedAt: string | null;
}
