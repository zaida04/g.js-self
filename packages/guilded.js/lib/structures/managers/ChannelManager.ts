import type {
    APIGetChannelMessageResult,
    APIPostChannelMessagesResult,
    APITeamChannel,
} from '@guildedjs/guilded-api-typings';

import { ConvertToMessageFormat } from '../../util/MessageUtil';
import type { DMChannel, TeamChannel } from '../Channel';
// eslint-disable-next-line no-duplicate-imports
import { PartialChannel } from '../Channel';
import type { Client } from '../Client';
import { Message } from '../Message';
import { PartialMessage } from '../PartialMessage';
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
        ...args: Parameters<typeof ConvertToMessageFormat>
    ): Promise<Message | string> {
        const channelID = ChannelManager.resolve(channel);
        const [id, formattedContent] = ConvertToMessageFormat(...args);

        return this.client.rest
            .post<APIPostChannelMessagesResult | never>(`/channels/${channelID}/messages`, formattedContent)
            .then(x =>
                'id' in x
                    ? new Message(
                          this.client,
                          x,
                          channel instanceof PartialChannel ? channel : this.client.channels.add({ id: channel })!,
                      )
                    : id,
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
            .get<APIGetChannelMessageResult>(`/channels/${channelID}/chat&messageId=${messageID}`)
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
     * Edit a message (UNFINISHED)
     * @hidden
     */
    private editMessage(channel: string, msg: string | Message, newContent: string) {
        throw new Error('Method not implemented and not intended for use yet.');

        const messageID = MessageManager.resolve(msg);
        return this.client.rest.put(`/channels/${channel}/messages/${messageID}`).then(x => {
            const existing = this.cache.get(messageID);
            if (existing) existing.patch(x);
            return existing ?? null;
        });
    }
}
