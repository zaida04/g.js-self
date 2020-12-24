import { APICategory, APIDMChannel, APITeamChannel, APITextChannel } from '../common';

/**
 * @destination /users/:id/channels
 */
export interface FetchDMChannels extends Record<string, any> {
    channels: APIDMChannel[];
    unreadInfoByChannelId: unknown;
    users: any[];
}

/**
 * @destination /teams/:id/channels
 */
export interface FetchTeamChannels extends Record<string, any> {
    channels: APITeamChannel[] | APITextChannel[];
    badgedChannelContentByChannelId: unknown;
    temporalChannels: any[];
    categories: APICategory[];
}
