import { ChatMessageUpdated } from '@guildedjs/guilded-api-typings';

import Client from '../../structures/Client';
import Event from './Event';

export default class ChatMessageUpdatedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: ChatMessageUpdated): (string | boolean)[] {
        return [false, 'passthrough'];
    }
}
