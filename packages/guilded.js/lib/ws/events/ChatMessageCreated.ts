import { ChatMessageCreated } from '@guildedjs/guilded-api-typings';

import Client from '../../structures/Client';
import Event from './Event';

export default class ChatMessageCreatedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: ChatMessageCreated): (string | boolean)[] {
        return [false, 'passthrough'];
    }
}
