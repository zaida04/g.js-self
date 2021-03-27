import { APIChannel, ChatMessageCreated } from '@guildedjs/guilded-api-typings';
import Channel from '../../structures/channels/Channel';
import PartialChannel from '../../structures/channels/PartialChannel';
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
            let channel: TextBasedChannel | PartialChannel = this.client.channels.cache.get(data.channelId) as TextBasedChannel;

            if(!channel) {
                channel = new PartialChannel(this.client, {id: data.channelId});
                this.client.channels.cache.set(channel.id, channel as unknown as Channel<APIChannel>);
            }

            const newMessage = new Message(this.client, { channelId: data.channelId, ...data.message }, channel)!;
            this.client.emit('messageCreate', newMessage);
            channel.messages.cache.set(newMessage.id, newMessage);
            return [true];
        }
        return [false, 'passthrough'];
    }
}
