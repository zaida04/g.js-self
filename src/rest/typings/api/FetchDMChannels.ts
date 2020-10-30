// Response from /users/:id/channels

import { DMChannel } from '../../../common';

export interface FetchDMChannels {
    channels: DMChannel[];
    unreadInfoByChannelId: unknown;
    users: any[];
}
