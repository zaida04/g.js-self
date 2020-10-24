// Response from /channels/:id/message?limit=:amt

import { PartialMessage } from '../structures/Message';

export interface FetchMessage {
    messages: PartialMessage[];
    hasPastMessages: boolean;
}
