import Channel from '../Channel';
import Client from '../Client';
import Message from '../Message';
import BaseManager from './BaseManager';

export default class ChannelMessageManager extends BaseManager<Message> {
    constructor(client: Client, public channel: Channel) {
        super(client, Message);
    }
    fetch(amnt: number) {
        if (amnt < 1 && amnt > 100) throw new TypeError('Please provide a number between 1 and 100');
        return this.client.rest.get(`/channels/${this.channel.id}/messages?limit=${amnt}`);
    }
}
