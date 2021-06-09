/* eslint-disable @typescript-eslint/naming-convention */
export enum websocket_events {
    CHAT_MESSAGE_CREATED = 'ChatMessageCreated',
    CHAT_MESSAGE_UPDATED = 'ChatMessageUpdated',
    CHAT_MESSAGE_REACTION_ADDED = 'ChatMessageReactionAdded',
    CHAT_MESSAGE_REACTION_DELETED = 'ChatMessageReactionDeleted',
}

export enum events {
    MESSAGE_CREATE = 'messageCreate',
    MESSAGE_UPDATE = 'messageUpdate',
    MESSAGE_REACTION_ADD = 'messageReactionAdd',
    MESSAGE_REACTION_DELETE = 'messageReactionDelete',
    READY = 'ready',
}
