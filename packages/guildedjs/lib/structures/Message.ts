import Collection from '@discordjs/collection';
import { APIDocument, APIDocumentNode, APILeaf, APIMessage } from '@guildedjs/guilded-api-typings';

import Base from './Base';
import Channel from './Channel';
import Client from './Client';
import Role from './Role';
import Team from './Team';
import User from './User';

// Adapted from https://github.com/Chixel/guilded.js/blob/master/src/Message.js

export default class Message extends Base {
    public createdBy!: string | User;
    public content!: string;
    public preparsedContent!: {
        type: string;
        content: string;
        reaction?: string;
        mention?: string;
        channel?: string;
    }[];
    public createdAt: Date | null = null;
    public type: string | null = null;
    public channel: Channel;
    public team: Team | null;

    constructor(client: Client, data: APIMessage) {
        super(client, data);
        this.channel = this.client.channels.cache.get(data.channelId)!;
        this.team = data.teamId && this.client.teams.cache.has(data.id) ? this.client.teams.cache.get(data.id)! : null;
        this._patch(data);
    }
    _patch(data: APIMessage): this {
        if ('createdBy' in data) {
            this.createdBy = this.client.users.cache.has(data.createdBy)
                ? this.client.users.cache.get(data.createdBy)!
                : data.createdBy;
        }
        // If ('content' in data) this.content = this.parseMessageContent(data.content.document);
        // Data.content.document.nodes[0].nodes[0].leaves[0].text;
        if ('createdAt' in data) this.createdAt = new Date(data.createdAt);
        if ('type' in data) this.type = data.type;

        return this;
    }

    private parseMessageContent() {}

    private addMention() {}

    // TODO: allow editing of message (convert to message format)
    edit(value: string): Promise<this> {
        return this.client.rest.put(`/channel/${this.channel.id}/messages/${this.id}`).then(() => {
            this.content = value;
            return this;
        });
    }
}

export class MessageMentions {
    public channels: Collection<string, Channel> = new Collection();
    public users: Collection<string, User> = new Collection();
    public roles: Collection<string, Role> = new Collection();
}
