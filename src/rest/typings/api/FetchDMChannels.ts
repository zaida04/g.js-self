// Response from /users/:id/channels

import { DMChannel } from '../structures/Channel';

export interface FetchDMChannels {
    channels: DMChannel[];
    unreadInfoByChannelId: unknown;
    users: any[];
}
