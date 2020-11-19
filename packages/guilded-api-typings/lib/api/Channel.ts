import { APICategory, APIDMChannel, APITeamChannel } from '../common';

/**
 * @destination /users/:id/channels
 */
export interface FetchDMChannels {
    channels: APIDMChannel[];
    unreadInfoByChannelId: unknown;
    users: any[];
}

/**
 * @destination /teams/:id/channels
 */
export interface FetchTeamChannels {
    channels: APITeamChannel[];
    badgedChannelContentByChannelId: unknown;
    temporalChannels: any[];
    categories: APICategory[];
}
