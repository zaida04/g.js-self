import { APITeam } from '../common';

/**
 * @destination /teams/:id
 */
export interface APIGetTeam {
    team: APITeam;
}
/**
 * @destination /teams/:id/invites
 */
export interface APIPostCreateInviteResult {
    id: string;
}
