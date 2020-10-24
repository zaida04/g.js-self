import { TeamData } from '../../../rest/typings/TeamData';
import Client from '../Client';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamManager extends BaseManager<Team> {
    constructor(client: Client) {
        super(client, Team);
    }
    async fetch(id: string): Promise<Team> {
        const existing = this.cache.get(id);
        if (existing) return Promise.resolve(existing);

        const data: TeamData = (await this.client.rest.get(`/teams/${id}`)).team as TeamData;
        const team = new Team(this.client, data)._patch(data);
        this.client.teams.add(team);
        return team;
    }
}
