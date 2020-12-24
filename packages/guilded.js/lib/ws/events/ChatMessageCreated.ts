import { ChatMessageCreated } from '@guildedjs/guilded-api-typings';
import DMChannel from '../../structures/channels/DMChannel';
import PartialChannel from '../../structures/channels/PartialChannel';
import TextBasedChannel from '../../structures/channels/TextBasedChannel';
import TextChannel from '../../structures/channels/TextChannel';

import Client from '../../structures/Client';
import Message from '../../structures/Message';
import Event from './Event';

export default class ChatMessageCreatedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: ChatMessageCreated): (string | boolean)[] {
        if (data) {
            const cachedChannel = this.client.channels.cache.get(data.channelId);
            this.client.emit('messageCreate', new Message(this.client, { channelId: data.channelId, ...data.message }, cachedChannel ? cachedChannel as TextBasedChannel : new PartialChannel(this.client, {id: data.channelId}))!)
            return [true];
        }
        return [false, 'passthrough'];
    }
}
