import Client from '../Client';
import Channel from '../Channel';
import BaseManager from './BaseManager';
import Team from '../Team';

export default class TeamChannelManager extends BaseManager<Channel> {
    constructor(client: Client, public team: Team) {
        super(client, Channel);
    }

    fetchChannels(): Promise<Team> {
        return this.client.rest.get(`/teams/${this.team.id}/channels`).then(x => {
            for (const channel_data of x.channels) {
                const channel = new Channel(this.client, channel_data, this.team);
                this.client.channels.add(channel);
                this.team.channels.add(channel);
            }
            return this.team;
        });
    }
}
