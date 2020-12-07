import Message from '../structures/Message';

export interface ClientEventParams {
    messageCreate: [Message];
    messageDelete: [Message];
    messageUpdate: [Message | null, Message];
    ready: [];
    raw: [any];
    disconnected: [];
    debug: any;
}
