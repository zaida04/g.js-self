import { WSChatMessageReactionAdded } from '@guildedjs/guilded-api-typings';

import { MessageReaction } from '../../structures';
import type { Client } from '../../structures/Client';
import { events } from '../../typings';
import Event from './Event';

export default class ChatMessageReactionAddedEvent extends Event {
    public constructor(client: Client) {
        super(client);
    }
    public ingest(data: WSChatMessageReactionAdded): (boolean | (string | undefined))[] {
        if (data) {
            const reacter = this.client.users.cache.get(data.reaction.createdBy);

            let channel = this.client.channels.cache.get(data.channelId);
            if (!channel) {
                if (!this.client.options?.partials?.includes('CHANNEL')) return [false, 'Uncached channel'];
                channel = this.client.channels.add({
                    contentType: data.contentType,
                    id: data.channelId,
                    teamId: data.teamId ?? undefined,
                    type: data.channelType,
                })!;
            }

            const message = channel?.messages?.cache.get(data.message.id);
            if (!message && !this.client.options?.partials?.includes('MESSAGE')) return [false, 'Uncached message'];

            let messageReaction = message?.reactions.get(data.reaction.customReactionId.toString());
            if (!messageReaction) {
                const newMessageReaction = new MessageReaction(this.client, {
                    ...data.reaction,
                    createdAt: new Date().toISOString(),
                    users: [{ botId: null, id: data.reaction.createdBy, webhookId: null }],
                });
                message?.reactions.set(newMessageReaction.id, newMessageReaction);
                messageReaction = newMessageReaction;
            }
            messageReaction.users.set(
                data.reaction.createdBy,
                this.client.users.cache.get(data.reaction.createdBy) ?? { id: data.reaction.createdBy },
            );

            this.client.emit(events.MESSAGE_REACTION_ADD, messageReaction, reacter ?? data.reaction.createdBy);
            return [true];
        }

        return [false, 'passthrough'];
    }
}
