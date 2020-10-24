import { DMChannel } from './Channel';

// Response from /users/:id/channels

export interface UserChannels {
    channels: DMChannel[];
    unreadInfoByChannelId: unknown;
    users: any[];
}
