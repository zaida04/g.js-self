// Response from /teams/:id/channels

import { Category, TeamChannel } from '../../../common';

export interface FetchTeamChannels {
    channels: TeamChannel[];
    badgedChannelContentByChannelId: unknown;
    temporalChannels: any[];
    categories: Category[];
}
