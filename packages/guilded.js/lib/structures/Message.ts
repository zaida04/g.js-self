import Collection from '@discordjs/collection';
import { parsedMessage, parseMessage } from '@guildedjs/common';
import type { APIMessage, APIMessageReaction } from '@guildedjs/guilded-api-typings';

import type { PartialMessageData, UpgradedMessageData } from '../typings';
import { retrieveChannelFromStructureCache, retrieveTeamFromStructureCache } from '../util';
import { Base } from './Base';
import { DMChannel, PartialChannel, TeamChannel } from './Channel';
import type { Client } from './Client';
import type { Team } from './Team';
import { User } from './User';

/**
 * Object representing a message sent on the Guilded API.
 * This class is used over a partial message when we have full data.
 */
export class Message extends Base<APIMessage> {
    /**
     * The channelID in which this message was sent. Will always be present, even if the channel isn't cached
     * @readonly
     */
    public readonly channelID!: string;

    /**
     * The plain text content that this message has
     */
    public content!: string;

    /**
     * Whether this message has been deleted or not.
     */
    public deleted = false;

    /**
     * The parsed but unjoined content that this message has
     */
    public parsedContent!: parsedMessage;

    /**
     * Author of the message
     */
    public readonly authorID!: string;

    /**
     * The ID of the team this message was sent in
     */
    public readonly teamID: string | null;

    /**
     * Reactions on this message
     */
    public reactions: Collection<string, MessageReaction>;

    /**
     * A boolean indicating that this message is NOT partial
     * @readonly
     * @defaultValue false
     */
    public readonly partial = false;

    private _team: Team | null;

    public constructor(
        client: Client,
        data: UpgradedMessageData,
        private _channel: DMChannel | TeamChannel | PartialChannel | null,
    ) {
        super(client, data);

        this.authorID = data.createdBy;
        this.channelID = data.channelId;
        this.teamID = data.teamId ?? null;
        this._team =
            this.channel instanceof TeamChannel
                ? this.channel.team ?? null
                : (this.teamID && this.client.teams.cache.get(this.teamID)) || null;
        this.reactions = new Collection();
        this.patch(data);
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIMessage | Partial<APIMessage>): this {
        if ('content' in data && data.content !== undefined) {
            this.parsedContent = parseMessage(data.content);
            this.content = this.parsedContent.parsedText;
        }

        if ('reactions' in data && data.reactions !== undefined) {
            for (const reaction of data.reactions) {
                this.reactions.set(reaction.customReactionId.toString(), new MessageReaction(this.client, reaction));
            }
        }
        return this;
    }

    /**
     * Retrieve the team object that channel this message belongs to belongs to.
     */
    public get team(): Team | null {
        return retrieveTeamFromStructureCache({
            _team: this._team,
            client: this.client,
            teamID: this.teamID,
        });
    }

    /**
     * Retrieve the channel object that this message belongs to.
     */
    public get channel(): DMChannel | TeamChannel | PartialChannel | null {
        return retrieveChannelFromStructureCache({
            _channel: this._channel,
            channelID: this.channelID,
            client: this.client,
        });
    }

    public get author(): User | null {
        return this.client.users.cache.get(this.authorID) ?? null;
    }

    /**
     * Add a reaction to this message (UNFINISHED)
     * @hidden
     */
    public react(emoji: string): unknown {
        return this.client.rest
            .post(`/channels/${this.channel?.id ?? this.channelID}/messages/${this.id}/reactions/${emoji}`, {})
            .then(x => {
                // Add reaction to message object
            });
    }

    /**
     * Remove a reaction from this message (UNFINISHED)
     * @hidden
     */
    public unreact(emoji: string): unknown {
        return this.client.rest
            .delete(`/channels/${this.channel?.id ?? this.channelID}/messages/${this.id}/reactions/${emoji}`, {})
            .then(x => {
                // Add reaction to message object
            });
    }

    /**
     * Delete this message
     */
    public delete(): Promise<Message | string> {
        return this.client.channels.deleteMessage(this.channelID, this);
    }

    /**
     * Edit the content of this message (UNFINISHED)
     * @hidden
     */
    private edit(content: string) {
        throw new Error('Method not implemented and not meant to be used.');
    }
}

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
    public parsedContent!: parsedMessage;

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
            this.parsedContent = parseMessage(data.content);
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

/**
 * Object representing information about a certain reaction emoji on a message. This is NOT an individual object of a specific reaction on a message.
 */
export class MessageReaction {
    /**
     * The users that have reacted with the emoji this message reaction belongs to.
     * It will contain either fully fledged User objects if the users are cached before hand, or it will contain minimal data about the users.
     */
    public readonly users: Collection<string, User | { id: string; webhookId?: string | null; botId?: string | null }>;

    /**
     * Date the first user reacted with the emoji this message reaction belongs to
     */
    public readonly createdAt: Date;

    /**
     * The ID of the emoji this message reaction belongs to.
     */
    public readonly id: string;

    public constructor(public client: Client, data: APIMessageReaction) {
        this.id = data.customReactionId.toString();
        this.createdAt = new Date(data.createdAt);
        this.users = new Collection();

        for (const user of data.users) {
            this.users.set(user.id, this.client.users.cache.get(user.id) ?? user);
        }
    }
}
