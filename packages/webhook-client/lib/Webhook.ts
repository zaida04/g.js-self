import { CONSTANTS, parsedMessage, parseMessage } from '@guildedjs/common';
import Embed from '@guildedjs/embeds';
import { APIContent, APIPostWebhookResult } from '@guildedjs/guilded-api-typings';
import { RestManager } from '@guildedjs/rest';

export class WebhookClient {
    private api = new RestManager({ apiURL: CONSTANTS.MEDIA_DOMAIN });
    public URL: string;
    public id: string;
    public token: string;

    public constructor(webhookConnection: string | { id: string; token: string }) {
        if (!webhookConnection) throw new TypeError('Must provide Webhook connection info.');
        if (typeof webhookConnection === 'string') {
            const destructuredWebhookURL = webhookConnection.match(/guilded.gg\/webhooks\/([^/]+)\/([^/]+)/);
            if (!destructuredWebhookURL?.length) {
                throw new Error('Not a proper guilded webhook URL! Alternatively, you can provide an ID/token');
            }
            this.id = destructuredWebhookURL[1];
            this.token = destructuredWebhookURL[2];
        } else if (webhookConnection.id && webhookConnection.token) {
            this.id = webhookConnection.id;
            this.token = webhookConnection.token;
        } else {
            throw new TypeError(
                'You must provide either a webhook URL or a webhook ID/token in an object when constructing the Webhook Client',
            );
        }

        this.URL = `${CONSTANTS.MEDIA_DOMAIN}/webhooks/${this.id}/${this.token}`;
    }

    public send(content: string, embeds?: Embed[]): Promise<WebhookExecuteResponse> {
        return this.api
            .post<APIPostWebhookResult>(`/webhooks/${this.id}/${this.token}`, {
                content,
                embeds,
            })
            .then(data => {
                const parsedContent = parseMessage(data.content);
                return {
                    ...data,
                    content: parsedContent.parsedText,
                    parsedContent,
                    rawContent: data.content,
                } as WebhookExecuteResponse;
            });
    }
}

export interface WebhookExecuteResponse extends Omit<APIPostWebhookResult, 'content'> {
    content: string;
    parsedContent: parsedMessage;
    rawContent: APIContent;
}

export default WebhookClient;
