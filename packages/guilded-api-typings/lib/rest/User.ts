import { APIClientUser, APICustomReaction, APIReactionUsage, APITeam, APIUser } from '../common';

/**
 * @destination /users/:id
 */
export interface FetchUser extends Record<string, any> {
    user: APIUser;
}

/**
 * @destination /me
 */
export interface FetchMe extends Record<string, any> {
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
export interface LoginResponse extends Record<string, any> {
    user: Omit<APIUser, 'userStatus' | 'email' | 'profileBannerSm'>;
}
