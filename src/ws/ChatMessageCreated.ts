import Client from '../guildedjs/structures/Client';
import Message from '../guildedjs/structures/Message';
import { ChatMessageCreated } from './payloads/ChatMessageCreated';

export default function ChatMessageCreated(client: Client, data: ChatMessageCreated): unknown {
    const message = new Message(client, data);
    client.channels.cache.get(data.channelId)?.messages.add(data);
    return client.emitter.emit('messageCreate', message);
}
