import Collection from '@discordjs/collection';

import {
    Document,
    DocumentNode,
    Leaf,
    Message as MessageData,
    MessageNodeInlineMention,
    MessageNodeInlineType,
    NestedNode,
} from '../../common';
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

    constructor(client: Client, data: MessageData) {
        super(client, data);
        this.channel = this.client.channels.cache.get(data.channelId)!;
        this.team = data.teamId && this.client.teams.cache.has(data.id) ? this.client.teams.cache.get(data.id)! : null;
        this._patch(data);
    }
    _patch(data: MessageData): this {
        if ('createdBy' in data) {
            this.createdBy = this.client.users.cache.has(data.createdBy)
                ? this.client.users.cache.get(data.createdBy)!
                : data.createdBy;
        }
        if ('content' in data) this.content = this.parseMessageContent(data.content.document);
        // Data.content.document.nodes[0].nodes[0].leaves[0].text;
        if ('createdAt' in data) this.createdAt = new Date(data.createdAt);
        if ('type' in data) this.type = data.type;

        return this;
    }

    private parseMessageContent(msg: Document) {
        let content = '';
        for (let node of msg.nodes) {
            node = node as DocumentNode;
            switch (node.type) {
                case 'paragraph': {
                    node.nodes.forEach(x => {
                        switch (x.object) {
                            case 'text': {
                                x.leaves.forEach(leaf => {
                                    content += leaf.text;
                                    this.preparsedContent.push({
                                        type: 'text',
                                        content: leaf.text,
                                    });
                                });
                                break;
                            }
                            case 'inline': {
                                if (((node as DocumentNode).type as MessageNodeInlineType) === 'reaction') {
                                } else {
                                    (node as DocumentNode).nodes[0].leaves.forEach(leaf =>
                                        this.addMention((node as DocumentNode).type as MessageNodeInlineMention, leaf),
                                    );
                                }
                                break;
                            }
                        }
                    });

                    break;
                }
                case 'block-quote-container': {
                    break;
                }
                case 'markdown-plain-text': {
                    break;
                }
                case 'webhookMessage': {
                    break;
                }
            }
        }
        return content;
    }

    private addMention(type: MessageNodeInlineMention, mention: Leaf) {
        switch (type) {
            case 'mention': {
                break;
            }
            case 'channel': {
                break;
            }
        }
    }

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
