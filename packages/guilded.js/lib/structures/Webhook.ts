import { APIWebhook } from '@guildedjs/guilded-api-typings';

import Base from './Base';

export default class Webhook extends Base<APIWebhook> {
    patch(data: APIWebhook | Partial<APIWebhook>): this {
        return this;
    }
}
