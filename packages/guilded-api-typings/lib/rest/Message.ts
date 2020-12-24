import { APIMessage } from '../common';

/**
 * @destination /channels/:id/messages?limit=:amt
 */
export interface FetchMessage extends Record<string, any> {
    messages: APIMessage[];
    hasPastMessages: boolean;
}
