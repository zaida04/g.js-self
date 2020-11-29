import Channel from '../Channel';
import Client from '../Client';
import BaseManager from './BaseManager';

export default class ChannelManager extends BaseManager<Channel> {
    constructor(client: Client) {
        super(client, Channel);
    }
}
