import Collection from '@discordjs/collection';
import type { APIGetChannelMessages, APIMessage } from '@guildedjs/guilded-api-typings';

import { UpgradedMessageData } from '../../typings/UpgradedMessageData';
import type { DMChannel, PartialChannel, TeamChannel } from '../Channel';
import type { Client } from '../Client';
import { Message } from '../Message';
import { PartialMessage } from '../PartialMessage';
import { BaseManager } from './BaseManager';
import { ChannelManager } from './ChannelManager';

export class MessageManager extends BaseManager<APIMessage | UpgradedMessageData, Message> {
    public constructor(client: Client, public readonly channel: TeamChannel | DMChannel | PartialChannel) {
        super(client, Message, { maxSize: client.options?.cache?.cacheMaxSize?.messagesCache });
    }

    public static resolve(message: string | Message | PartialMessage): string {
        return message instanceof Message || message instanceof PartialMessage ? message.id : message;
    }

    /**
     * Delete a message
     */
    public delete(msg: string | Message): Promise<Message | string> {
        return this.client.channels.deleteMessage(this.channel.id, msg);
    }

    /**
     * Add a reaction to this message (UNFINISHED)
     * @hidden
     */
    public react(message: string | Message, channel: string | PartialChannel, emoji: string): unknown {
        const messageID = MessageManager.resolve(message);
        const channelID = ChannelManager.resolve(channel);
        return this.client.rest.post(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}`, {}).then(x => {
            // Add reaction to message object
        });
    }

    /**
     * Remove a reaction from this message (UNFINISHED)
     * @hidden
     */
    public unreact(message: string | Message, channel: string | PartialChannel, emoji: string): unknown {
        const messageID = MessageManager.resolve(message);
        const channelID = ChannelManager.resolve(channel);
        return this.client.rest
            .delete(`/channels/${channelID}/messages/${messageID}/reactions/${emoji}`, {})
            .then(x => {
                // Add reaction to message object
            });
    }

    /**
     * Fetch multiple messages from the channel this manager belongs to
     * @param amnt The amount of messages to fetch.
     * @param cache Whether to cache the fetched messages or not.
     */
    public fetch(amnt: number, cache = true): Promise<Collection<string, Message>> {
        if (Number.isNaN(amnt)) throw new TypeError('Expected a number for message fetching amount!');
        if (amnt > 100) amnt = 100;
        if (amnt < 0) amnt = 1;
        const messages: Collection<string, Message> = new Collection();
        return this.client.rest
            .get<APIGetChannelMessages>(`/channels/${this.channel.id}/messages?limit=${amnt}`)
            .then(x => {
                for (const message of x.messages) {
                    const tempMessage = this.add([this.client, message, this.channel]);
                    messages.set(message.id, tempMessage!);
                    if (cache) this.add(tempMessage!);
                }
                return messages;
            });
    }
}
