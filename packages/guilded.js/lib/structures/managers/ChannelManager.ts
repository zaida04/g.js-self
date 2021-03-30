import type { APIGetChannelMessageResult, APIMessage, APIPostChannelMessagesResult, APITeamChannel } from '@guildedjs/guilded-api-typings';
import { ConvertToMessageFormat } from '../../util/MessageUtil';
import type { TeamChannel, DMChannel } from '../Channel';
import { PartialChannel } from '../Channel';

import type { Client } from '../Client';
import Message from '../Message';
import BaseManager from './BaseManager';
import MessageManager from './MessageManager';

export default class ChannelManager extends BaseManager<APITeamChannel, TeamChannel | DMChannel | PartialChannel> {
    public constructor(client: Client) {
        super(client, PartialChannel, { maxSize: client.options?.cache?.cacheMaxSize?.channelsCache });
    }

    public static resolve(channel: string | PartialChannel): string {
        return channel instanceof PartialChannel ? channel.id : channel;
    }

    public sendMessage(channel: string | PartialChannel, content: string) {
        const [id, formattedContent] = ConvertToMessageFormat(content);
        return this.client.rest.post<APIPostChannelMessagesResult | never>(`/channels/${channel}/messages`, formattedContent).then(x => {
            return "id" in x ? new Message(this.client, x, channel instanceof PartialChannel ? channel : this.client.channels.add({ id: channel })!) : id;
        });
    }

    public fetchMessage(channel: string | PartialChannel, message: string | Message, cache = true): Promise<Message> {
        const channelID = ChannelManager.resolve(channel);
        const messageID = MessageManager.resolve(message);
        return this.client.rest.get<APIGetChannelMessageResult>(`/channels/${channelID}/chat&messageId=${messageID}`).then(x => {
            let targetChannel = channel instanceof PartialChannel ? channel : this.client.channels.cache.get(channelID);
            if(!channel) {
                targetChannel = new PartialChannel(this.client, { id: x.channelId }, null);
                this.client.channels.add(targetChannel);
            }
            const newMessage = new Message(this.client, x, targetChannel!);
            return newMessage;
        })
    }

    /**
     * Delete a message
     */
    public deleteMessage(channel: string, msg: string | Message) {
        if(!msg) throw new TypeError("Expected a string or message object for message deletion.");

        const messageID = MessageManager.resolve(msg);
        return this.client.rest.delete(`/channels/${channel}/messages/${messageID}`).then((x) => {
            const existingChannel = this.cache.get(channel);
            const existingMessage = existingChannel?.messages?.cache.get(messageID);

            if(existingMessage) existingMessage.deleted = true;
            return existingMessage ?? messageID;
        })
    }

    
    /**
     * Edit a message (UNFINISHED)
     * @hidden
     */
    private editMessage(channel: string, msg: string | Message, newContent: string) {
        throw new Error("Method not implemented and not intended for use yet.");
        
        const messageID = MessageManager.resolve(msg);
        return this.client.rest.put(`/channels/${channel}/messages/${messageID}`).then((x) => {
            const existing = this.cache.get(messageID);
            if(existing) existing.patch(x);
            return existing ?? null;
        })
    }

}
