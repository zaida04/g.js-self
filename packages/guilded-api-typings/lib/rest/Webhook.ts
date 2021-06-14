import { APIContent, APIEmbed, APIWebhook } from '../common';

/**
 * Create Webhook
 * @destination /webhooks
 */
export interface APIPostCreateWebhookBody {
    name: string;
    channelId: string;
}

/**
 * Create Webhook Result
 * @destination /webhooks
 */
export type APIPostCreateWebhookResult = APIWebhook;

/**
 * Get Channel Webhooks
 * @destination /teams/:teamID/channels/:channelID/webhooks
 */
export interface APIGetTeamChannelWebhooks {
    webhooks: APIWebhook[];
}

/**
 * Modify Webhook
 * @destination /webhooks/:webhookID
 */
export interface APIPutWebhookBody {
    name: string;
    iconUrl: string;
    channelId: string;
}

/**
 * Modify Webhook Result
 * @destination /webhooks/:webhookID
 */
export type APIPutWebhookResult = APIWebhook;

/**
 * Delete Webhook Result
 * @destination /webhooks/:webhookID
 */
export type APIDeleteWebhookResult = Pick<APIWebhook, 'id' | 'deletedAt'>;

/**
 * Execute Webhook
 * @destination /webhooks/:webhookID/:webhookToken
 */
export interface APIPostWebhookBody {
    content: string;
    embeds: APIEmbed[];
}

export interface APIPostWebhookResult {
    id: string;
    channelId: string;
    content: APIContent;
    type: string;
    createdBy: string;
    createdAt: string;
    webhookId: string;
    botId: string | null;
}
