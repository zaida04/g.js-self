import { APIPartialTeam, APITeam, FetchTeam } from '@guildedjs/guilded-api-typings';

import Client from '../Client';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamManager extends BaseManager<APITeam | APIPartialTeam, Team> {
    constructor(client: Client) {
        super(client, Team);
    }

    /**
     * Fetch a team, will retrieve from cache if exists
     */
    fetch(id: string, cache = true) {
        const existing = this.cache.get(id);
        if (existing) return existing;

        return this.client.rest.get<FetchTeam>(`/teams/${id}`).then((data) => {
            if (cache) this.add(data.team);
        })
    }
}
