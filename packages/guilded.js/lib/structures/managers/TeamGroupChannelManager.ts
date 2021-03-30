import type { APITeamChannel } from '@guildedjs/guilded-api-typings';
import type { CHANNEL_TYPES } from '../../typings/ChannelTypes';

import { TeamChannel } from '../Channel';
import type { Client } from '../Client';
import type Group from '../Group';
import BaseManager from './BaseManager';

export default class TeamGroupChannelManager extends BaseManager<APITeamChannel, TeamChannel> {
    public constructor(client: Client, public group: Group) {
        super(client, TeamChannel, { maxSize: client.options?.cache?.cacheMaxSize?.channelsCache });
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
