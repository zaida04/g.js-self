import { MessageData } from '../../ws/payloads/MessageData';
import Base from './Base';
import Channel from './Channel';
import Client from './Client';
import Team from './Team';

export default class Message extends Base {
    public createdBy: string | null = null;
    public content: string | null = null;
    public createdAt: Date | null = null;
    public type: string | null = null;

    constructor(client: Client, data: MessageData, public channel: Channel, public team: Team) {
        super(client, data);
    }
    _patch(data: any, channel: Channel, team: Team): this {
        if ('createdBy' in data) {
            this.createdBy = data.createdBy;
        }

        if ('content' in data) this.content = data.content.document.nodes[0].nodes[0].leaves[0].text;

        if ('createdAt' in data) {
            this.createdAt = new Date(data.createdAt);
        }

        if ('type' in data) {
            this.type = data.type;
        }

        if (channel) {
            this.channel = channel;
        }

        if (team) {
            this.team = team;
        }

        return this;
    }

    edit(value: string): Promise<this> {
        return this.client.rest.put(`/channel/${this.channel.id}/messages/${this.id}`).then(() => {
            this.content = value;
            return this;
        });
    }
}
