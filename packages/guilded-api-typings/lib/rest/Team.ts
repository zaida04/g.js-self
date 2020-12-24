import { APIPartialTeam, APITeam } from '../common';

/**
 * @destination /teams/:id
 */
export interface FetchTeam extends Record<string, any> {
    team: APITeam;
}

/**
 * @destination /teams/:invalid-id
 */
export interface FetchTeams extends Record<string, any> {
    teams: APIPartialTeam;
}
