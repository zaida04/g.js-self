import Client from '../guildedjs/structures/Client';

export default class GatewayHandler {
    constructor(public readonly client: Client) {}

    public sendHB(): unknown {
        if (!this.client.ws) return;
        if (this.client.ws.readyState !== 1) return;
        this.client.ws.send('2');
        setTimeout(this.sendHB, 10000);
    }

    init() {
        if (!this.client.ws) return;

        this.client.ws.on('open', () => {
            this.client.emitter.emit('debug', 'Gateway connection established');
            this.client.emitter.emit('ready', '');
            this.sendHB();
        });
        this.client.ws.on('message', (incomingData: string) => {
            this.client.emitter.emit('debug', 'Gateway message recieved');
            this.dataRecieved(incomingData);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.client.ws.on('close', (closeData: any) => {
            this.client.emitter.emit('debug', 'Gateway connection terminated');
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
        this.client.emitter.emit('raw', event_data);
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
