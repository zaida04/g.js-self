import type { APIMessage } from '@guildedjs/guilded-api-typings';

import * as MessageUtil from '../util/MessageUtil';
import Base from './Base';
import type { Client } from "./Client";
import Message from './Message';

export default class PartialMessage extends Base<APIMessage> {
    /**
     * The channelID in which this message was sent. Will always be present, even if the channel isn't cached
     */
    public readonly channelID!: string;

    public readonly teamID!: string;

    /**
     * The plain text content that this message has
     */
     public content!: string;

    /**
     * The parsed but unjoined content that this message has
     */
    public parsedContent!: MessageUtil.parsedMessage;

    public partial = true;

    public constructor(client: Client, data: APIPartialMessage) {
        super(client, data);
        this.channelID = data.channelId;

        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIMessage | Partial<APIMessage>): this {
        if ('content' in data && data.content !== undefined) {
            this.parsedContent = MessageUtil.ParseMessage(data.content);
            this.content = this.parsedContent.parsedText;
        }
        return this;
    }

    public fetch(): Promise<Message> {
        return this.client.channels.fetchMessage(this.channelID, this.id);
    }
}
