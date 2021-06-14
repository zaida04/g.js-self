import Collection from '@discordjs/collection';
import * as MessageUtil from '@guildedjs/common';
import type { APIMessage } from '@guildedjs/guilded-api-typings';

import type { UpgradedMessageData } from '../typings/UpgradedMessageData';
import { Base } from './Base';
import type { DMChannel, PartialChannel } from './Channel';
// eslint-disable-next-line no-duplicate-imports
import { TeamChannel } from './Channel';
import type { Client } from './Client';
import { MessageReaction } from './MessageReaction';
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
    public parsedContent!: MessageUtil.parsedMessage;

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
            this.parsedContent = MessageUtil.parseMessage(data.content);
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
        if (!this._team) return this._team;
        const cachedTeam = this.teamID && this.client.teams.cache.get(this.teamID);
        if (!cachedTeam) return null;
        this._team = cachedTeam;
        return cachedTeam;
    }

    /**
     * Retrieve the channel object that this message belongs to.
     */
    public get channel(): DMChannel | TeamChannel | PartialChannel | null {
        if (!this._channel) return this._channel;
        const cachedChannel = this.client.channels.cache.get(this.channelID) as TeamChannel;
        if (!cachedChannel) return null;
        this._channel = cachedChannel;
        return cachedChannel;
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
