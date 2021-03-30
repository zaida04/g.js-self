import {
    APIAboutInfo,
    APIClientUser,
    APICustomReaction,
    APIDMChannel,
    APIReactionUsage,
    APITeam,
    APIUser,
} from '../common';

/**
 * Get User
 * @destination /users/:id
 */
export interface APIGetUser extends Record<string, any> {
    user: APIUser;
}

/**
 * Get Current User
 * @destination /me
 */
export interface APIGetCurrentUser extends Record<string, any> {
    updateMessage: string | null;
    user: APIClientUser;
    teams: APITeam[];
    customReactions: APICustomReaction[];
    reactionUsages: APIReactionUsage[];
    landingUrl: boolean;
}

/**
 * Modify Current User
 * @destination /users/:userID/profilev2
 */
export interface APIPutCurrentUserBody extends Record<string, any> {
    name: string;
    avatar: string;
    subdomain: string;
    aboutInfo: APIAboutInfo;
}

/**
 * Modify Current User
 * @destination /users/:userID/profilev2
 */
export type APIPutCurrentUserResult = APIUser;

/**
 * Leave Team
 * @destination /teams/:teamID/members/:userID
 */
export type APIDeleteUserTeam = never;

/**
 * Login the Client
 * @destination /login
 */
export interface APIPostLoginResponse extends Record<string, any> {
    user: Omit<APIUser, 'userStatus' | 'email' | 'profileBannerSm'>;
}

/**
 * Create DM Channel
 * @destination /users/:id/channels
 */
export interface APIGetUserDMChannels extends Record<string, any> {
    channels: APIDMChannel[];
    unreadInfoByChannelId: unknown;
    users: any[];
}
