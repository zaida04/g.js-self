import type {
    WSChatMessageCreated,
    WSChatMessageReactionAdded,
    WSChatMessageReactionDeleted,
    WSChatMessageUpdated,
    WSGatewayReady,
} from '@guildedjs/guilded-api-typings';
import WebSocket from 'ws';

import type { Client } from '../structures/Client';
import { events, websocket_events } from '../typings';
import { CONSTANTS } from '../util/Consts';
import ChatMessageCreatedEvent from './events/ChatMessageCreated';
import ChatMessageReactionAddedEvent from './events/ChatMessageReactionAdded';
import ChatMessageReactionDeletedEvent from './events/ChatMessageReactionDeleted';
import ChatMessageUpdatedEvent from './events/ChatMessageUpdated';
import GatewayHandler from './GatewayHandler';

export class ClientGatewayHandler extends GatewayHandler {
    public lastPing: number | null = null;
    private reconnectionAmnt = 0;

    public events = {
        ChatMessageCreated: new ChatMessageCreatedEvent(this.client),
        ChatMessageReactionAdded: new ChatMessageReactionAddedEvent(this.client),
        ChatMessageUpdated: new ChatMessageUpdatedEvent(this.client),
        ChatMessageReactionDeleted: new ChatMessageReactionDeletedEvent(this.client),
    };
    public constructor(client: Client) {
        super(client);
    }

    public init(): this | null {
        if (this.ws) return this;
        const socketURL = `wss://${CONSTANTS.BASE_DOMAIN}/socket.io/?jwt=undefined&EIO=3&transport=websocket`;
        this.ws = new WebSocket(socketURL, {
            headers: {
                cookie: `hmac_signed_session=${this.client.rest.token}`,
            },
        });
        this.ws
            .on('open', () => (this.connectedAt = new Date()))
            .on('message', (incomingData: string) => {
                this.client.debug('Gateway message recieved', incomingData);
                this.dataRecieved(incomingData);
            })
            .on('close', (...closeData: unknown[]) => {
                this.client.debug(`Gateway connection terminated. Related data: ${closeData}`);
                const shouldntReconnect =
                    this.client.options?.ws?.disallowReconnect ||
                    this.reconnectionAmnt >= (this.client.options?.ws?.reconnectLimit ?? Infinity);
                this.client.destroy(!shouldntReconnect);

                if (shouldntReconnect) return this.client.emit('disconnected', closeData);
                this.reconnectionAmnt++;
                this.client.emit('reconnecting', closeData);
            });
        return this;
    }

    public dataRecieved(incomingData: string): void {
        let data: string = incomingData;
        let opCode = '';
        for (const char of data) {
            if (!Number.isInteger(Number(char))) break;
            data = data.substr(1);
            opCode += char;
        }

        try {
            switch (Number(opCode)) {
                case 0: {
                    this.client.debug('Heartbeat started...');

                    let packet;
                    try {
                        packet = JSON.parse(data) as WSGatewayReady;
                    } catch (e) {
                        throw new Error(`malformed payload! ${data}`);
                    }

                    this.sessionID = packet.sid;
                    this.heartbeater.start(packet.pingInterval);
                    break;
                }

                case 3: {
                    this.lastPing = Date.now();
                    this.ping = this.lastPing - this.heartbeater.lastPingSentAt;
                    this.client.debug('Ping returned. ');
                    break;
                }

                case 40: {
                    this.client.debug('Ready event recieved.');
                    this.client.emit(events.READY);
                    break;
                }

                case 42: {
                    let event_name, event_data;

                    try {
                        [event_name, event_data] = JSON.parse(data);
                    } catch (e) {
                        throw new Error(`malformed payload! ${data}`);
                    }

                    if (this.client.options?.ws?.disabledEvents?.includes(event_name)) return;
                    this.client.emit('raw', event_name, event_data);

                    let result: (boolean | (string | undefined))[] | undefined;
                    switch (event_name) {
                        case websocket_events.CHAT_MESSAGE_CREATED: {
                            result = this.events.ChatMessageCreated.ingest(event_data as WSChatMessageCreated);
                            break;
                        }
                        case websocket_events.CHAT_MESSAGE_UPDATED: {
                            result = this.events.ChatMessageUpdated.ingest(event_data as WSChatMessageUpdated);
                            break;
                        }
                        case websocket_events.CHAT_MESSAGE_REACTION_ADDED: {
                            result = this.events.ChatMessageReactionAdded.ingest(
                                event_data as WSChatMessageReactionAdded,
                            );
                            break;
                        }
                        case websocket_events.CHAT_MESSAGE_REACTION_DELETED: {
                            result = this.events.ChatMessageReactionDeleted.ingest(
                                event_data as WSChatMessageReactionDeleted,
                            );
                            break;
                        }
                    }
                    if (!result?.[0]) this.client.debug(`Event dropped because of ${result?.[1]}`);
                    break;
                }
            }
        } catch (e) {
            this.client.debug('Error parsing WS event', e);
        }
    }
}
