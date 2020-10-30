import Collection from '@discordjs/collection';

import { FetchMessage } from '../../../rest';
import Channel from '../Channel';
import Client from '../Client';
import Message from '../Message';
import BaseManager from './BaseManager';

export default class ChannelMessageManager extends BaseManager<Message> {
    constructor(client: Client, public channel: Channel) {
        super(client, Message);
    }
    async fetch(amnt: number): Promise<Collection<string, Message>> {
        if (amnt < 1 && amnt > 100) throw new TypeError('Please provide a number between 1 and 100');
        const messages: Collection<string, Message> = new Collection();

        const api_messages = (await this.client.rest.get(
            `/channels/${this.channel.id}/messages?limit=${amnt}`,
        )) as FetchMessage;

        for (const api_message of api_messages.messages) {
            messages.set(api_message.id, new Message(this.client, api_message));
        }

        return messages;
    }
}
