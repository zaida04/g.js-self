import { APIMessage } from '../common';

/**
 * @destination /channels/:id/message?limit=:amt
 */
export interface FetchMessage {
    messages: APIMessage[];
    hasPastMessages: boolean;
}
