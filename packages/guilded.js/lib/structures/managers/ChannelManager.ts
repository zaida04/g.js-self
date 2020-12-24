import { APIChannel, APIPartialTeam, APITeam } from '@guildedjs/guilded-api-typings';

import Channel from '../channels/Channel';
import Client from '../Client';
import BaseManager from './BaseManager';

export default class ChannelManager extends BaseManager<APIChannel, Channel<APIChannel>> {
    constructor(client: Client) {
        super(client, Channel);
    }
}
