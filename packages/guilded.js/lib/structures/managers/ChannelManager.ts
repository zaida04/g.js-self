import { APIChannel, APIPartialTeam, APITeam } from '@guildedjs/guilded-api-typings';
import { ConvertToMessageFormat } from '../../util/MessageUtil';

import Channel from '../channels/Channel';
import TextBasedChannel from '../channels/TextBasedChannel';
import Client from '../Client';
import Message from '../Message';
import BaseManager from './BaseManager';

export default class ChannelManager extends BaseManager<APIChannel, Channel<APIChannel>> {
    public constructor(client: Client) {
        super(client, Channel);
    }

    private resolveMessage(message: string | Message): string {
        return message instanceof Message ? message.id : message;
    }

    public sendMessage(channel: string, content: string) {
        const [id, formattedContent] = ConvertToMessageFormat(content);
        return this.client.rest.post(`/channels/${channel}/messages`, formattedContent).then(() => id);
    }

    /**
     * Delete a message
     */
    public deleteMessage(channel: string, msg: string | Message) {
        if(!msg) throw new TypeError("Expected a string or message object for message deletion.");

        const messageID = this.resolveMessage(msg);
        return this.client.rest.delete(`/channels/${channel}/messages/${messageID}`).then((x) => {
            const existingChannel = this.cache.get(channel) as TextBasedChannel | undefined;
            const existingMessage = existingChannel?.messages.cache.get(messageID);

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
        
        const messageID = this.resolveMessage(msg);
        return this.client.rest.put(`/channels/${channel}/messages/${messageID}`).then((x) => {
            const existing = this.cache.get(messageID);
            if(existing) existing.patch(x);
            return existing ?? null;
        })
    }

}
