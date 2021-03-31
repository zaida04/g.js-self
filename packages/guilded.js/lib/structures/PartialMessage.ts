import type { APIMessage, APIPartialMessage } from '@guildedjs/guilded-api-typings';
import { PartialMessageData } from '../typings/PartialMessageData';

import * as MessageUtil from '../util/MessageUtil';
import {Base} from './Base';
import type { Client } from "./Client";
import {Message} from './Message';

/**
 * Object representing a message that doesn't have enough data to construct a regular message.
 */
export class PartialMessage extends Base<PartialMessageData> {
    /**
     * The channelID in which this message was sent. Will always be present, even if the channel isn't cached
     * @readonly
     */
    public readonly channelID!: string;

    /**
     * The ID of the team this channel belongs to
     * @readonly
     */
    public readonly teamID!: string;

    /**
     * The plain text content that this message has
     */
    public content!: string;

    /**
     * The parsed but unjoined content that this message has
     */
    public parsedContent!: MessageUtil.parsedMessage;

    /**
     * A boolean indicating that this is infact a partial message.
     * @readonly
     * @defaultValue true
     */
    public readonly partial = true;

    public constructor(client: Client, data: PartialMessageData) {
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

    /**
     * Fetch a complete version of this message from the api, will error if the message has been deleted or isn't accessible by the client.
     */
    public fetch(): Promise<Message> {
        return this.client.channels.fetchMessage(this.channelID, this.id);
    }
}
