import Collection from '@discordjs/collection';
import { APIMessage, FetchMessage} from '@guildedjs/guilded-api-typings';
import PartialChannel from '../channels/PartialChannel';
import TextBasedChannel from '../channels/TextBasedChannel';
import Client from '../Client';

import Message from '../Message';
import BaseManager from './BaseManager';

export default class MessageManager extends BaseManager<APIMessage, Message> {
    constructor(client: Client, public readonly channel: TextBasedChannel | PartialChannel) {
        super(client, Message);
    }
    fetch(amnt: number, cache = true) {
        if (amnt > 100) amnt = 100;
        if (amnt < 0) amnt = 1;
        const messages: Collection<string, Message> = new Collection();
        return this.client.rest.get<FetchMessage>(`/channels/${this.channel.id}/messages?limit=${amnt}`).then((x) => {
            for (const message of x.messages) {
                const tempMessage = this.add(message);
                messages.set(message.id, tempMessage!);
                if (cache) this.add(tempMessage!);
            }
            return messages;
        })
    }
}
