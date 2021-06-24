import type { APIWebhook } from '@guildedjs/guilded-api-typings';

import {
    retrieveChannelFromStructureCache,
    retrieveCreatorFromStructureCache,
    retrieveTeamFromStructureCache,
} from '../util';
import { Base } from './Base';
import type { TeamChannel } from './Channel';
import type { Client } from './Client';
import type { Team } from './Team';
import type { User } from './User';

/**
 * Object representing received webhook data. This object is NOT to be used to send data to webhooks. That will be WebhookClient
 */
export class Webhook extends Base<APIWebhook> {
    /**
     * The username belonging to this webhook
     */
    public name!: string;

    /**
     * The ID of the channel this webhook belongs to
     */
    public channelID: string;

    /**
     * The ID of the team this webhook belongs to
     */
    public teamID: string;

    /**
     * The URL of the avatar belonging to this webhook
     */
    public iconURL: string | null;

    /**
     * The ID of the user who created this webhook
     */
    public createdByID: string;

    /**
     * The date in which this webhook was created
     */
    public createdAt: Date;

    /**
     * The date this webhook was deleted if it was deleted
     */
    public deletedAt: Date | null;

    private _team: Team | null;
    private _createdBy: User | null;

    public constructor(client: Client, data: APIWebhook, private _channel: TeamChannel | null) {
        super(client, data);
        this.createdAt = new Date(data.createdAt);
        this.deletedAt = null;
        this.iconURL = null;
        this.createdByID = data.createdBy;
        this.channelID = data.channelId;
        this.teamID = data.teamId;
        this._team = _channel?.team ?? null;
        this._createdBy = null;
        this.patch(data);
    }

    /**
     * The channel object this webhook belongs to if cached
     */
    public get channel(): TeamChannel | null {
        return retrieveChannelFromStructureCache({
            _channel: this._channel,
            channelID: this.channelID,
            client: this.client,
        }) as TeamChannel | null;
    }

    /**
     * The User object of the user that created this webhook if cached
     */
    public get createdBy(): User | null {
        return retrieveCreatorFromStructureCache({
            _createdBy: this._createdBy,
            client: this.client,
            createdByID: this.createdByID,
        });
    }

    /**
     * The team object this webhook belongs to if cached
     */
    public get team(): Team | null {
        return retrieveTeamFromStructureCache({
            _team: this._team,
            client: this.client,
            teamID: this.teamID,
        });
    }

    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APIWebhook | Partial<APIWebhook>): this {
        if ('name' in data && data.name !== undefined) this.name = data.name;
        if ('iconUrl' in data && data.iconUrl !== undefined) this.iconURL = data.iconUrl;
        if ('deletedAt' in data && data.deletedAt !== undefined) {
            this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
        }

        return this;
    }
}
