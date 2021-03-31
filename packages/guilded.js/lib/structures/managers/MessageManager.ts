import Collection from '@discordjs/collection';
import type { APIMessage, APIGetChannelMessages } from '@guildedjs/guilded-api-typings';
import type { PartialChannel, TeamChannel, DMChannel} from '../Channel';
import type { Client } from '../Client';

import {Message} from '../Message';
import { PartialMessage } from '../PartialMessage';
import {BaseManager} from './BaseManager';

export class MessageManager extends BaseManager<APIMessage, Message> {
    constructor(client: Client, public readonly channel: TeamChannel | DMChannel | PartialChannel) {
        super(client, Message, { maxSize: client.options?.cache?.cacheMaxSize?.messagesCache });
    }

    public static resolve(message: string | Message | PartialMessage): string {
        return message instanceof Message || message instanceof PartialMessage ? message.id : message;
    }

    /**
     * Delete a message
     */
    public delete(msg: string | Message) {
        this.client.channels.deleteMessage(this.channel.id, msg);
    }

    /**
     * Fetch multiple messages from the channel this manager belongs to
     * @param amnt The amount of messages to fetch. 
     * @param cache Whether to cache the fetched messages or not.
     */
    public fetch(amnt: number, cache = true) {
        if(Number.isNaN(amnt)) throw new TypeError("Expected a number for message fetching amount!");
        if (amnt > 100) amnt = 100;
        if (amnt < 0) amnt = 1;
        const messages: Collection<string, Message> = new Collection();
        return this.client.rest.get<APIGetChannelMessages>(`/channels/${this.channel.id}/messages?limit=${amnt}`).then((x) => {
            for (const message of x.messages) {
                const tempMessage = this.add(message);
                messages.set(message.id, tempMessage!);
                if (cache) this.add(tempMessage!);
            }
            return messages;
        })
    }
}
