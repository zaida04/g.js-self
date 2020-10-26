import { FetchTeam } from '../../../rest';
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

        const data: FetchTeam = (await this.client.rest.get(`/teams/${id}`)).team as FetchTeam;
        const team = new Team(this.client, data as FetchTeam);
        this.client.teams.add(team);
        return team;
    }
}
