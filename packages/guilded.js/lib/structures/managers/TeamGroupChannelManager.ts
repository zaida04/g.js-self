import type { APITeamChannel, CHANNEL_TYPES } from '@guildedjs/guilded-api-typings';

import { TeamChannel } from '../Channel';
import type { Client } from '../Client';
import type { Group } from '../Group';
import { BaseManager } from './BaseManager';

export class TeamGroupChannelManager extends BaseManager<APITeamChannel, TeamChannel> {
    public constructor(client: Client, public group: Group) {
        super(client, TeamChannel, { maxSize: client.options?.cache?.cacheMaxSize?.channelsCache });
    }

    /**
     * Create a channel in the group this manager belongs to.
     */
    public create({
        name,
        parent,
        type,
        isPublic = true,
    }: {
        name: string;
        parent?: string;
        type: CHANNEL_TYPES;
        isPublic: boolean;
    }): Promise<unknown> {
        return this.client.rest.post(`/teams/${this.group.team?.id}/groups/${this.group.id}/channels`, {
            channelCategoryId: parent,
            contentType: type,
            isPublic: isPublic,
            name,
        });
    }
}
