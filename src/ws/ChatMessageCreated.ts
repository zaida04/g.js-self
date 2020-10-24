import Client from '../guildedjs/structures/Client';
import Message from '../guildedjs/structures/Message';
import { ChatMessageCreated } from './payloads/ChatMessageCreated';

export default function ChatMessageCreated(client: Client, data: ChatMessageCreated): unknown {
    const message = new Message(
        client,
        data.message,
        client.channels.add({ id: data.channelId, type: data.channelType, category: data.channelCategoryId }),
        client.teams.add({ id: data.teamId }),
    );
    client.channels.cache.get(data.channelId)?.messages.add(data.message);
    return client.emitter.emit('messageCreate', message);
}
