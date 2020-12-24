import { APIWebhook } from '@guildedjs/guilded-api-typings';
 
import Base from './Base';
import type TeamChannel from './channels/TeamChannel';
import type Team from './Team';
import type User from './User';
 
export default class Webhook extends Base<APIWebhook> {
    public id!: string;
    public name!: string;
    public channelID!: string;
    public channel!: TeamChannel | null;
    public teamID!: string;
    public team!: Team | null;
    public iconURL!: string | null;
    public createdByID!: string;
    public createdBy!: User;
    public createdAt!: Date;
    public deletedAt!: Date | null;
    patch(data: APIWebhook | Partial<APIWebhook>): this {
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
 
        if ('createdBy' in data && data.createdBy !== undefined) this.createdByID = data.createdBy;
        // This.createdBy = this.client.users.cache.get(this.createdByID) ?? null;
 
        if ('createdAt' in data && data.createdAt !== undefined) this.createdAt = new Date(data.createdAt);
 
        if ('deletedAt' in data && data.deletedAt !== undefined)
            this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
 
        return this;
    }
}
 
