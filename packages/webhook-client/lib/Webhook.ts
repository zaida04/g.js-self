import { parsedMessage, parseMessage } from '@guildedjs/common';
import Embed from '@guildedjs/embeds';
import { APIContent, APIPostWebhookResult } from '@guildedjs/guilded-api-typings';

import { BASE_URL } from './consts';
import RestHandler from './Rest';

export class WebhookClient {
    private api = new RestHandler(this);
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
            this.URL = webhookConnection;
            this.id = destructuredWebhookURL[1];
            this.token = destructuredWebhookURL[2];
        } else if (webhookConnection.id && webhookConnection.token) {
            this.id = webhookConnection.id;
            this.token = webhookConnection.token;
            this.URL = `${BASE_URL}/${this.id}/${this.token}`;
        } else {
            throw new TypeError(
                'You must provide either a webhook URL or a webhook ID/token in an object when constructing the Webhook Client',
            );
        }
    }

    public send(content: string, embeds?: Embed[]): Promise<WebhookExecuteResponse> {
        return this.api
            .post<APIPostWebhookResult>(`/${this.id}/${this.token}`, {
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
