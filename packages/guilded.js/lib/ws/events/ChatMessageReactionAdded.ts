import { WSChatMessageReactionAdd } from '@guildedjs/guilded-api-typings';

import type { Client } from '../../structures/Client';
import Event from './Event';

export default class ChatMessageReactionAddedEvent extends Event {
    constructor(client: Client) {
        super(client);
    }
    public ingest(data: WSChatMessageReactionAdd): (string | boolean)[] {
        if(data) {
            const channel = this.client.channels.cache.get(data.channelId);
            if(!channel) return [false, "Uncached channel"];
            const message = channel?.messages?.cache.get(data.message.id);
            if(!message) return [false, "Uncached message"];
            message.reactions.get(data.reaction.customReactionId.toString())?.users.set(data.reaction.createdBy, this.client.users.cache.get(data.reaction.createdBy) ?? { id: data.reaction.createdBy});
        }
        
        return [false, 'passthrough'];
    }
}
