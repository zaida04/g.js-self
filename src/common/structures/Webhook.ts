export interface Webhook {
    id: string;
    name: string;
    channelId: string;
    teamId: string;
    iconUrl: string | null;
    createdBy: string;
    createdAt: string;
    deletedAt: string;
}
