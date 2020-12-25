import Message from '../structures/Message';

/**
 * @internal
 */
export interface ClientEventParams {
    messageCreate: [Message];
    messageDelete: [Message];
    messageUpdate: [Message | null, Message];
    ready: [];
    raw: [any];
    disconnected: [];
    debug: any;
}
