import { WSChatMessageCreated } from '@guildedjs/guilded-api-typings';
import type { Client } from '../../structures/Client';
import {Message} from '../../structures/Message';
import Event from './Event';
import { PartialChannel} from '../../structures';
import { events } from '../../typings';

export default class ChatMessageCreatedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: WSChatMessageCreated) {
        if (data) {
            let channel = this.client.channels.cache.get(data.channelId);
            let team = (data.teamId ? this.client.teams.cache.get(data.teamId) : null) ?? null;

            if(!channel) {
                channel = new PartialChannel(this.client, {id: data.channelId, type: data.channelType, createdAt: data.createdAt, createdBy: data.createdBy, contentType: data.contentType }, team);
                this.client.channels.cache.set(channel.id, channel);
            }

            const newMessage = new Message(this.client, { channelId: data.channelId, teamId: data.teamId, ...data.message }, channel)!;
            this.client.emit(events.MESSAGE_CREATE, newMessage);
            channel.messages!.cache.set(newMessage.id, newMessage);
            return [true];
        }
        return [false, 'passthrough'];
    }
}
