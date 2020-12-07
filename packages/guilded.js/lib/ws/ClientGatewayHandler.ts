import { ChatMessageCreated, ChatMessageReactionAdd, ChatMessageUpdated } from '@guildedjs/guilded-api-typings';
import WebSocket from 'ws';

import Client from '../structures/Client';
import { WebSocketEvents } from '../typings/WebSocketEvents';
import ChatMessageCreatedEvent from './events/ChatMessageCreated';
import ChatMessageReactionAddedEvent from './events/ChatMessageReactionAdded';
import ChatMessageUpdatedEvent from './events/ChatMessageUpdated';
import GatewayHandler from './GatewayHandler';

export default class ClientGatewayHandler extends GatewayHandler {
    public events = {
        ChatMessageCreated: new ChatMessageCreatedEvent(this.client),
        ChatMessageReactionAdded: new ChatMessageReactionAddedEvent(this.client),
        ChatMessageUpdated: new ChatMessageUpdatedEvent(this.client),
    };
    constructor(client: Client) {
        super(client);
    }

    init(): this | null {
        if (this.ws) throw new Error('Already established WS Connection');
        const socketURL = `wss://${this.client.rest.baseDomain}/socket.io/?jwt=undefined&EIO=3&transport=websocket`;
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
            .on('close', (closeData: any) => {
                this.client.debug('Gateway connection terminated');
                this.client.destroy();
            });
        return this;
    }

    // TODO: Separate actions in switch case statement
    /*
        Action Types:
        - ChatMessageCreated
        - ChatMessageUpdated
        - ChatMessageReactionAdded
    */
    dataRecieved(incomingData: string): void {
        let data: string = incomingData;
        let opCode = '';
        for (const char of data) {
            if (!Number.isInteger(Number(char))) break;
            data = data.substr(1);
            opCode += char;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        try {
            switch (Number(opCode)) {
                case 0: {
                    this.client.debug('Heartbeat started...');
                    this.heartbeater.start();
                    break;
                }

                case 3: {
                    this.ping = Date.now() - this.heartbeater.pingSentAt;
                    this.client.debug('Ping returned. ');
                    break;
                }

                case 40: {
                    this.client.debug('Ready event recieved.');
                    this.client.emit('ready');
                    break;
                }

                case 42: {
                    const [event_name, event_data]: [WebSocketEvents, Record<string, any>] = JSON.parse(data);
                    if (this.client.options?.ws?.disabledEvents.includes(event_name)) return;
                    this.client.emit('raw', event_data);
                    switch (event_name) {
                        case 'ChatMessageCreated': {
                            const result = this.events.ChatMessageCreated.ingest(event_data as ChatMessageCreated);
                            if (!result[0]) this.client.debug(`Event dropped because of ${result[1]}`);
                            break;
                        }
                        case 'ChatMessageUpdated': {
                            const result = this.events.ChatMessageUpdated.ingest(event_data as ChatMessageUpdated);
                            if (!result[0]) this.client.debug(`Event dropped because of ${result[1]}`);
                            break;
                        }
                        case 'ChatMessageReactionAdded': {
                            const result = this.events.ChatMessageReactionAdded.ingest(
                                event_data as ChatMessageReactionAdd,
                            );
                            if (!result[0]) this.client.debug(`Event dropped because of ${result[1]}`);
                            break;
                        }
                    }
                    break;
                }
            }
        } catch (e) {
            this.client.debug('Error parsing WS event', e);
        }
    }
}
