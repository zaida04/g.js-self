import { BaseData } from '../typings/BaseData';
import Base from './Base';
import Client from './Client';
import ChannelMessageManager from './managers/ChannelMessageManager';
import Team from './Team';

export default class Channel extends Base {
    public messages = new ChannelMessageManager(this.client, this);
    public name: string | null = null;
    public type: 'Team';
    public archivedAt: Date | null = null;
    public groupId: string | null = null;

    constructor(client: Client, data: any, public team: Team) {
        super(client, data);
        this.type = data.type;

        this._patch(data);
    }

    _patch(data: any): this {
        if ('name' in data) this.name = data.name;
        if ('archivedAt' in data) this.archivedAt = new Date(data.archivedAt);
        if ('groupId' in data) this.groupId = data.groupId;

        return this;
    }

    setName(value: string): Promise<this> {
        return this.client.rest
            .put(`/teams/${this.team.id}/groups/${this.groupId}/channels/${this.id}/info`, { name: value })
            .then(() => {
                this.name = value;
                return this;
            });
    }

    archive(): Promise<this> {
        return this.client.rest
            .put(`/teams/${this.team.id}/groups/${this.groupId}/channels/${this.id}/archive`)
            .then(() => {
                this.archivedAt = new Date();
                return this;
            });
    }
}
