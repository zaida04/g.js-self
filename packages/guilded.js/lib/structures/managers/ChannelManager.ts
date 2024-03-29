import { generateMessage, parseToMessage } from '@guildedjs/common';
import Embed from '@guildedjs/embeds';
import type {
    APIGetChannelMessageResult,
    APIMessage,
    APIPostChannelMessagesResult,
    APITeamChannel,
} from '@guildedjs/guilded-api-typings';

import { DMChannel, PartialChannel, TeamChannel } from '../Channel';
import type { Client } from '../Client';
import { Message, PartialMessage } from '../Message';
import { BaseManager } from './BaseManager';
import { MessageManager } from './MessageManager';

export class ChannelManager extends BaseManager<APITeamChannel, TeamChannel | DMChannel | PartialChannel> {
    public constructor(client: Client) {
        super(client, PartialChannel, { maxSize: client.options?.cache?.cacheMaxSize?.channelsCache });
    }

    public static resolve(channel: string | PartialChannel): string {
        return channel instanceof PartialChannel ? channel.id : channel;
    }

    /**
     * Send a message to a channel, using either the object or channel ID.
     * @param channel The ID or channel object of the target channel to send this message to
     */
    public sendMessage(
        channel: string | PartialChannel,
        content: string | Embed,
        embed?: Embed,
    ): Promise<Message | string> {
        const channelID = ChannelManager.resolve(channel);
        const [messageID, formattedContent] = generateMessage(content, embed);
        return this.client.rest
            .post<APIPostChannelMessagesResult | never>(`/channels/${channelID}/messages`, { ...formattedContent, messageId: messageID })
            .then(x =>
                'id' in x
                    ? new Message(
                          this.client,
                          x,
                          channel instanceof PartialChannel ? channel : this.client.channels.add({ id: channel })!,
                      )
                    : messageID,
            );
    }

    /**
     * Fetch a message from a channel from the API
     * @param channel The ID or channel object of the taret channel to fetch the message from.
     * @param message The ID, message object, or partial message object of the message to fetch.
     * @param cache Whether to cache the fetched message or not.
     */
    public fetchMessage(
        channel: string | PartialChannel,
        message: string | Message | PartialMessage,
    ): Promise<Message> {
        const channelID = ChannelManager.resolve(channel);
        const messageID = MessageManager.resolve(message);
        return this.client.rest
            .get<APIGetChannelMessageResult>(`/channels/${channelID}/chat?messageId=${messageID}`)
            .then(x => {
                let targetChannel =
                    channel instanceof PartialChannel ? channel : this.client.channels.cache.get(channelID);
                if (!channel) {
                    targetChannel = new PartialChannel(this.client, { id: x.channelId }, null);
                    this.client.channels.add(targetChannel);
                }
                const newMessage = new Message(this.client, x, targetChannel!);
                targetChannel!.messages!.cache.set(newMessage.id, newMessage);
                return newMessage;
            });
    }

    /**
     * Delete a message from a channel.
     * @param channel The ID or channel object of the channel to delete the message from.
     * @param msg The ID or message object of the message to delete.
     */
    public deleteMessage(channel: string | PartialChannel, msg: string | Message): Promise<Message | string> {
        if (!msg) throw new TypeError('Expected a string or message object for message deletion.');
        const channelID = ChannelManager.resolve(channel);
        const messageID = MessageManager.resolve(msg);
        return this.client.rest.delete(`/channels/${channelID}/messages/${messageID}`).then(() => {
            const existingChannel = this.cache.get(channelID);
            const existingMessage = existingChannel?.messages?.cache.get(messageID);

            if (existingMessage) existingMessage.deleted = true;
            return existingMessage ?? messageID;
        });
    }

    /**
     * Edit a message
     * @hidden
     */
    public editMessage(channel: string | PartialChannel, msg: string | Message, newContent: string): Promise<Message> {
        const channelID = ChannelManager.resolve(channel);
        const messageID = MessageManager.resolve(msg);
        return this.client.rest
            .put<APIMessage>(`/channels/${channelID}/messages/${messageID}`, { content: parseToMessage(newContent) })
            .then(x => {
                const existingChannel = this.client.channels.cache.get(x.channelId);
                if (!existingChannel) return new Message(this.client, x, null);
                const existingMessage = existingChannel.messages!.cache.get(x.id);
                if (existingMessage) return existingMessage.patch(x);
                return existingChannel.messages!.add(x)!;
            });
    }
}
