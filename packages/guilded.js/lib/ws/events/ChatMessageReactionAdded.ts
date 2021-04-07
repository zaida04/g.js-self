import { WSChatMessageReactionAdded } from '@guildedjs/guilded-api-typings';
import { MessageReaction } from '../../structures';

import type { Client } from '../../structures/Client';
import { events } from '../../typings';
import Event from './Event';

export default class ChatMessageReactionAddedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: WSChatMessageReactionAdded) {
        if(data) {
            const reacter = this.client.users.cache.get(data.reaction.createdBy);
            const channel = this.client.channels.cache.get(data.channelId);
            if(!channel) return [false, "Uncached channel"];
            const message = channel?.messages?.cache.get(data.message.id);
            if(!message && !this.client.options?.partials?.includes("MESSAGE")) return [false, "Uncached message"];
            let messageReaction = message?.reactions.get(data.reaction.customReactionId.toString());
            if(!messageReaction) {
                const newMessageReaction = new MessageReaction(this.client, { ...data.reaction, createdAt: new Date().toISOString(), users: [{ id: data.reaction.createdBy, webhookId: null, botId: null }]});
                message?.reactions.set(newMessageReaction.id, newMessageReaction);
                messageReaction = newMessageReaction;
            }
            messageReaction.users.set(data.reaction.createdBy, this.client.users.cache.get(data.reaction.createdBy) ?? { id: data.reaction.createdBy});
            this.client.emit(events.MESSAGE_REACTION_ADD, messageReaction, reacter ?? data.reaction.createdBy);
            return [true];
        }
        
        return [false, 'passthrough'];
    }
}
