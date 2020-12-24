import { APITeamChannel } from '@guildedjs/guilded-api-typings';

import TeamChannel from '../channels/TeamChannel';
import Client from '../Client';
import BaseManager from './BaseManager';

export default class TeamGroupChannelManager extends BaseManager<APITeamChannel, TeamChannel> {
    constructor(client: Client) {
        super(client, TeamChannel);
    }
}
