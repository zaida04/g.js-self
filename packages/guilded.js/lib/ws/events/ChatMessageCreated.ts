import { WSChatMessageCreated } from '@guildedjs/guilded-api-typings';

import { PartialChannel } from '../../structures';
import type { Client } from '../../structures/Client';
import { Message } from '../../structures/Message';
import { events } from '../../typings';
import Event from './Event';

export default class ChatMessageCreatedEvent extends Event {
    public constructor(client: Client) {
        super(client);
    }
    public ingest(data: WSChatMessageCreated): (boolean | (string | undefined))[] {
        if (data) {
            let channel = this.client.channels.cache.get(data.channelId);
            const team = (data.teamId ? this.client.teams.cache.get(data.teamId) : null) ?? null;

            if (!channel) {
                channel = new PartialChannel(
                    this.client,
                    {
                        id: data.channelId,
                        type: data.channelType,
                        createdAt: data.createdAt,
                        createdBy: data.createdBy,
                        contentType: data.contentType,
                    },
                    team,
                );
                this.client.channels.cache.set(channel.id, channel);
            }

            const newMessage = new Message(
                this.client,
                { channelId: data.channelId, teamId: data.teamId, ...data.message },
                channel,
            )!;
            channel.messages!.cache.set(newMessage.id, newMessage);
            this.client.emit(events.MESSAGE_CREATE, newMessage);
            return [true];
        }
        return [false, 'passthrough'];
    }
}
