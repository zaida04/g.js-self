import type { APIWebhook } from '@guildedjs/guilded-api-typings';

import type { Client } from '../Client';
import type Team from '../Team';
import Webhook from '../Webhook';
import BaseManager from './BaseManager';

export default class TeamWebhookManager extends BaseManager<APIWebhook, Webhook> {
    public constructor(client: Client, public readonly team: Team) {
        super(client, Webhook, { maxSize: client.options?.cache?.cacheMaxSize?.teamWebhooksCache });
    }
}
