import { APIWebhook } from '@guildedjs/guilded-api-typings';
 
import Base from './Base';
import type TeamChannel from './channels/TeamChannel';
import type Team from './Team';
import type User from './User';
 
export default class Webhook extends Base<APIWebhook> {
    /**
     * The username belonging to this webhook
     */
    public name!: string;

    /**
     * The ID of the channel this webhook belongs to
     */
    public channelID!: string;

    /**
     * The channel object this webhook belongs to if cached
     */
    public channel!: TeamChannel | null;

    /**
     * The ID of the team this webhook belongs to 
     */
    public teamID!: string;
    
    /**
     * The team object this webhook belongs to if cached
     */
    public team!: Team | null;

    /**
     * The URL of the avatar belonging to this webhook
     */
    public iconURL!: string | null;

    /**
     * The ID of the user who created this webhook
     */
    public createdByID!: string;

    /**
     * The User object of the user that created this webhook if cached
     */
    public createdBy!: User | null;

    /**
     * The date in which this webhook was created
     */
    public createdAt!: Date;

    /**
     * The date this webhook was deleted if it was deleted
     */
    public deletedAt!: Date | null;

    /**
     * Update the data in this structure
     * @internal
     */  
    public patch(data: APIWebhook | Partial<APIWebhook>): this {
        if ('name' in data && data.name !== undefined) this.name = data.name;
        if ('channelId' in data && data.channelId !== undefined) {
            this.channelID = this.channelID;
            this.channel = this.client.channels.cache.get(this.channelID) as TeamChannel ?? null;
        }
        if ('teamId' in data && data.teamId !== undefined) {
            this.teamID = data.teamId;
            this.team = this.client.teams.cache.get(this.teamID) ?? null;
        }
        if ('iconUrl' in data && data.iconUrl !== undefined) this.iconURL = data.iconUrl;
        if ('createdBy' in data && data.createdBy !== undefined) {
            this.createdByID = data.createdBy;
            this.createdBy = this.client.users.cache.get(this.createdByID) ?? null;
        }
        if ('createdAt' in data && data.createdAt !== undefined) this.createdAt = new Date(data.createdAt);
        if ('deletedAt' in data && data.deletedAt !== undefined)
            this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
 
        return this;
    }
}
 
