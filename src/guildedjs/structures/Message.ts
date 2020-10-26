import { MessageData } from '../typings/MessageData';
import Base from './Base';
import Channel from './Channel';
import Client from './Client';
import Team from './Team';
import User from './User';

export default class Message extends Base {
    public createdBy: string | null = null;
    public content: string | null = null;
    public createdAt: Date | null = null;
    public type: string | null = null;
    public channel: Channel;
    public team: Team | null;

    constructor(client: Client, data: MessageData) {
        super(client, data);
        this.channel = this.client.channels.add(data.id);
        this.team = this.client.teams.add(data.teamId);
        this._patch(data);
    }
    _patch(data: any): this {
        if ('createdBy' in data) {
            this.createdBy = this.client.users.cache.has(data.createdBy)
                ? this.client.users.cache.get(data.createdBy)
                : data.createdBy;
        }
        if ('content' in data) this.content = data.content.document.nodes[0].nodes[0].leaves[0].text;
        if ('createdAt' in data) this.createdAt = new Date(data.createdAt);
        if ('type' in data) this.type = data.type;

        return this;
    }

    edit(value: string): Promise<this> {
        return this.client.rest.put(`/channel/${this.channel.id}/messages/${this.id}`).then(() => {
            this.content = value;
            return this;
        });
    }
}
