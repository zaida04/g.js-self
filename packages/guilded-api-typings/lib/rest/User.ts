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
export interface APIGetUser {
    user: APIUser;
}

/**
 * Get Current User
 * @destination /me
 */
export interface APIGetCurrentUser {
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
export interface APIPutCurrentUserBody {
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
export interface APIPostLoginResponse {
    user: Omit<APIUser, 'userStatus' | 'email' | 'profileBannerSm'>;
}

/**
 * Get all of a user's DM Channel
 * @destination /users/:id/channels
 */
export interface APIGetUserDMChannels {
    channels: APIDMChannel[];
    unreadInfoByChannelId: unknown;
    users: APIUser[];
}
