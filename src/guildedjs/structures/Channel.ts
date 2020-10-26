import Base from './Base';
import Client from './Client';
import GuildedJSError from './GuildedJSError';
import ChannelMessageManager from './managers/ChannelMessageManager';
import Team from './Team';

export default class Channel extends Base {
    public messages = new ChannelMessageManager(this.client, this);
    public name: string | null = null;
    public type: 'Team';
    public archivedAt: Date | null = null;
    public groupId: string | null = null;
    public team: Team | null = null;

    constructor(client: Client, data: any) {
        super(client, data);
        this.type = data.type;
        this.team = data.teamId ? this.client.teams.add(data.teamId) : null;
        this._patch(data);
    }

    _patch(data: any): this {
        if ('name' in data) this.name = data.name;
        if ('archivedAt' in data) this.archivedAt = new Date(data.archivedAt);
        if ('groupId' in data) this.groupId = data.groupId;

        return this;
    }

    setName(value: string): Promise<this> {
        if (!this.team) throw new GuildedJSError('This channel does not belong to a guild.');
        return this.client.rest
            .put(`/teams/${this.team.id}/groups/${this.groupId}/channels/${this.id}/info`, { name: value })
            .then(() => {
                this.name = value;
                return this;
            });
    }

    archive(): Promise<this> {
        if (!this.team) throw new GuildedJSError('This channel does not belong to a guild.');
        return this.client.rest
            .put(`/teams/${this.team.id}/groups/${this.groupId}/channels/${this.id}/archive`)
            .then(() => {
                this.archivedAt = new Date();
                return this;
            });
    }
}
