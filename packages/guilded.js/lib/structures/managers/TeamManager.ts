import { APIPartialTeam, APITeam, FetchTeam } from '@guildedjs/guilded-api-typings';

import Client from '../Client';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamManager extends BaseManager<APITeam | APIPartialTeam, Team> {
    public constructor(client: Client) {
        super(client, Team);
    }

    /**
     * Fetch a team, will retrieve from cache if exists
     */
    public fetch(id: string, cache = true) {
        const existing = this.cache.get(id);
        if (existing) return existing;

        return this.client.rest.get<FetchTeam>(`/teams/${id}`).then((data) => {
            let newTeam
            if (cache) {
                newTeam = this.add(data.team);
            } else {
                newTeam = new Team(this.client, data.team);
            }
            return newTeam; 
        })
    }
}
