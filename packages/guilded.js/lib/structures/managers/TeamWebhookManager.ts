import { APIMember, APIPartialTeam, APITeam, APIWebhook } from '@guildedjs/guilded-api-typings';

import Client from '../Client';
import Team from '../Team';
import Webhook from '../Webhook';
import BaseManager from './BaseManager';

export default class TeamWebhookManager extends BaseManager<APIWebhook, Webhook> {
    public constructor(client: Client, public readonly team: Team) {
        super(client, Webhook);
    }
}
