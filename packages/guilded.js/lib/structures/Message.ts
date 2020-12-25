import { APIMessage } from '@guildedjs/guilded-api-typings';

import * as MessageUtil from '../util/MessageUtil';
import Base from './Base';
import DMChannel from './channels/DMChannel';
import PartialChannel from './channels/PartialChannel';
import TeamChannel from './channels/TeamChannel';
import type TextBasedChannel from './channels/TextBasedChannel';
import TextChannel from './channels/TextChannel';
import type Client from './Client';
import type Team from './Team';

export default class Message extends Base<APIMessage> {
    /**
     * The channelID in which this message was sent. Will always be present, even if the channel isn't cached
     */
    public channelID!: string;

    /**
     * The plain text content that this message has
     */
    public content!: string;

    /**
     * The parsed but unjoined content that this message has
     */
    public parsedContent!: MessageUtil.parsedMessage;

    /**
     * The team in which this message was sent in, if any
     */
    public team!: Team | null;

    constructor(client: Client, data: APIMessage, public readonly channel: DMChannel | TextChannel | PartialChannel) {
        super(client, data, false);
        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    patch(data: APIMessage | Partial<APIMessage>): this {
        if ("channelId" in data && data.channelId !== undefined) this.channelID = data.channelId;

        if(this.channel instanceof TextChannel && this.channel?.team) this.team = this.channel.team

        if ('content' in data && data.content !== undefined) {
            this.parsedContent = MessageUtil.ParseMessage(data.content);
            this.content = this.parsedContent.parsedText;
        }
        return this;
    }

    /**
     * Add a reaction to this message (UNFINISHED)
     * @hidden
     */
    react(emoji: string) {
        return this.client.rest.post(`/channels/${this.channel?.id ?? this.channelID}/messages/${this.id}/reactions/${emoji}`, {}).then((x) => {
            // add reaction to message object
        })
    }

    /**
     * Edit the content of this message (UNFINISHED)
     * @hidden
     */
    edit(content: string) {

    }
}
