// Response from /teams/:id/channels

import { Category, TeamChannel } from '../structures/Channel';

export interface FetchTeamChannels {
    channels: TeamChannel[];
    badgedChannelContentByChannelId: unknown;
    temporalChannels: any[];
    categories: Category[];
}
