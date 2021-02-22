import { APITeamChannel } from '@guildedjs/guilded-api-typings';
import { CHANNEL_TYPES } from '../../typings/ChannelTypes';

import TeamChannel from '../channels/TeamChannel';
import Client from '../Client';
import Group from '../Group';
import BaseManager from './BaseManager';

export default class TeamGroupChannelManager extends BaseManager<APITeamChannel, TeamChannel> {
    public constructor(client: Client, public group: Group) {
        super(client, TeamChannel);
    }

    public create({name, parent, type, isPublic = true}: { name: string, parent?: string, type: CHANNEL_TYPES, isPublic: boolean }) {
        return this.client.rest.post(`/teams/${this.group.team?.id}/groups/${this.group.id}/channels`, {
            name,
            channelCategoryId: parent,
            contentType: type,
            isPublic: isPublic
        })
    }
}
