import { APITeam } from '../common';

/**
 * @destination /teams/:id
 */
export interface APIGetTeam extends Record<string, any> {
    team: APITeam;
}
