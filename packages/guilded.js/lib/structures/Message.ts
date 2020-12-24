import { APIMessage } from '@guildedjs/guilded-api-typings';

import * as MessageUtil from '../util/MessageUtil';
import Base from './Base';
import DMChannel from './channels/DMChannel';
import TeamChannel from './channels/TeamChannel';
import type TextBasedChannel from './channels/TextBasedChannel';
import TextChannel from './channels/TextChannel';
import type Client from './Client';
import type Team from './Team';

export default class Message extends Base<APIMessage> {
    public channelID!: string;
    public content!: string;
    public preParsedContent!: MessageUtil.parsedMessage;
    public team!: Team | null;
    public channel: DMChannel | TextChannel | null;

    constructor(client: Client, data: APIMessage, channel: TextBasedChannel) {
        super(client, data, false);
        this.channel = null;

        if (channel.type === "text") this.channel = channel as TextChannel;
        this.patch(data);
    }

    patch(data: APIMessage | Partial<APIMessage>): this {
        if ("channelId" in data && data.channelId !== undefined) this.channelID = data.channelId;

        if(this.channel instanceof TextChannel && this.channel?.team) this.team = this.channel.team

        if ('content' in data && data.content !== undefined) {
            this.preParsedContent = MessageUtil.ParseMessage(data.content);
            this.content = this.preParsedContent.parsedText;
        }
        return this;
    }

    react(emoji: string) {
        return this.client.rest.post(`/channels/${this.channel?.id ?? this.channelID}/messages/${this.id}/reactions/${emoji}`, {}).then((x) => {
            // add reaction to message object
        })
    }

    edit(content: string) {

    }
}
