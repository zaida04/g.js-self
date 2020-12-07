import { APIPartialTeam, APITeam } from '../common';

/**
 * @destination /teams/:id
 */
export interface FetchTeam {
    team: APITeam;
}

/**
 * @destination /teams/:invalid-id
 */
export interface FetchTeams {
    teams: APIPartialTeam;
}
