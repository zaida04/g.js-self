import { WSChatMessageReactionDeleted } from '@guildedjs/guilded-api-typings';
import { MessageReaction } from '../../structures';

import type { Client } from '../../structures/Client';
import { events } from '../../typings';
import Event from './Event';

export default class ChatMessageReactionDeletedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: WSChatMessageReactionDeleted) {
        if(data) {
            const reactionID = data.reaction.customReactionId.toString();
            const reacter = this.client.users.cache.get(data.reaction.createdBy);
            const channel = this.client.channels.cache.get(data.channelId);

            if(!channel) return [false, "Uncached channel"];
            const message = channel?.messages?.cache.get(data.message.id);
            if(!message && !this.client.options?.partials?.includes("MESSAGE")) return [false, "Uncached message"];

            const messageReaction = message?.reactions.get(reactionID);
            messageReaction?.users.delete(data.reaction.createdBy);
            if(!messageReaction?.users.size) message?.reactions.delete(reactionID);
            
            this.client.emit(events.MESSAGE_REACTION_DELETE, messageReaction ?? reactionID, reacter ?? data.reaction.createdBy);
            return [true];
        }
        
        return [false, 'passthrough'];
    }
}
