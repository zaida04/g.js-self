import { APIClientUser, APICustomReaction, APIReactionUsage, APITeam, APIUser } from '../common';

/**
 * @destination /users/:id
 */
export interface FetchUser {
    user: APIUser;
}

/**
 * @destination /me
 */
export interface FetchMe {
    updateMessage: string | null;
    user: APIClientUser;
    teams: APITeam[];
    customReactions: APICustomReaction[];
    reactionUsages: APIReactionUsage[];
    landingUrl: boolean;
}

/**
 * @destination /login
 */
export interface LoginResponse {
    user: Omit<APIUser, 'userStatus' | 'email' | 'profileBannerSm'>;
}
