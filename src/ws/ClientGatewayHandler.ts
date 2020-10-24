import Client from '../guildedjs/structures/Client';

export default class GatewayHandler {
    constructor(public readonly client: Client) {}

    init() {
        if (!this.client.ws) return;

        this.client.ws.on('open', () => {
            this.client.emitter.emit('ready', '');
            this.client.sendHB();
        });

        this.client.ws.on('message', (incomingData: string) => {
            this.dataRecieved(incomingData);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.client.ws.on('close', (closeData: any) => {
            this.client.emitter.emit('disconnected', closeData);
        });
    }

    // eslint-disable-next-line no-warning-comments
    // TODO: Separate actions in switch case statement
    /*
        Action Types:
        - ChatMessageCreated
        - ChatMessageUpdated
        - ChatMessageReactionAdded
        - TEAM_CHANNEL_ARCHIVED
        - TemporalChannelCreated
    */
    dataRecieved(incomingData: string): void {
        let data: string = incomingData;
        for (const char of data) {
            if (!(char >= '0' && char <= '9')) break;
            data = data.substr(1);
        }
        if (data.length < 3) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const [event_name, event_data]: [string, Record<string, any>] = JSON.parse(data);
        this.client.emitter.emit('debug', event_data);
        switch (event_name) {
            case 'ChatMessageCreated': {
            }
            case 'ChatMessageUpdated': {
            }
            case 'ChatMessageReactionAdded': {
            }
            case 'TemporalChannelCreated': {
            }
        }
    }
}
