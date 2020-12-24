import { ChatMessageCreated } from '@guildedjs/guilded-api-typings';
import TextBasedChannel from '../../structures/channels/TextBasedChannel';

import Client from '../../structures/Client';
import Message from '../../structures/Message';
import Event from './Event';

export default class ChatMessageCreatedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: ChatMessageCreated): (string | boolean)[] {
        if (data) {
            this.client.emit('messageCreate', new Message(this.client, { channelId: data.channelId, ...data.message }, this.client.channels.cache.get(data.channelId) as TextBasedChannel ?? null))
            return [true];
        }
        return [false, 'passthrough'];
    }
}
