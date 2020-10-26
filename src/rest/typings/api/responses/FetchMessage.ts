// Response from /channels/:id/message?limit=:amt

import { Message } from '../structures/Message';

export interface FetchMessage {
    messages: Message[];
    hasPastMessages: boolean;
}
