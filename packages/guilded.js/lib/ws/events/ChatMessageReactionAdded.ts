import { ChatMessageReactionAdd } from '@guildedjs/guilded-api-typings';

import Client from '../../structures/Client';
import Event from './Event';

export default class ChatMessageReactionAddedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: ChatMessageReactionAdd): (string | boolean)[] {
        return [false, 'passthrough'];
    }
}
