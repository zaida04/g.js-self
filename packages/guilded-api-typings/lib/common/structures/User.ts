import { APIContent } from '../Content';
import { APICustomReaction } from './Emoji';

export interface APIUserStatus {
    content: APIContent | null;
    customReactionId: number | null;
    customReaction?: APICustomReaction;
}

export interface APIAboutInfo {
    bio?: string;
    tagLine?: string;
}

export interface APISocialLink {
    type: SocialLinkSource;
    handle: null | string;
    additionalInfo: APISocialLinkAdditionalInfo;
}

export interface APISocialLinkAdditionalInfo {
    channelName?: string;
}

export enum USER_PRESENCE {
    ONLINE = 1,
    IDLE = 2,
    DND = 3,
    INVISIBLE = 4,
}

export interface APIAlias {
    alias?: string;
    discriminator: null | string;
    name: string;
    createdAt?: string;
    userId?: string;
    gameId: number;
    socialLinkSource: SocialLinkSource | null;
    additionalInfo: unknown;
    editedAt?: string;
    playerInfo: unknown;
}

export type SocialLinkSource =
    | 'bnet'
    | 'discord'
    | 'psn'
    | 'steam'
    | 'switch'
    | 'twitch'
    | 'twitter'
    | 'xbox'
    | 'youtube';

export interface APIDevice {
    type: string;
    id: string;
    lastOnline: string;
    isActive: boolean;
}

export interface APIUser {
    aboutInfo: APIAboutInfo;
    aliases: APIAlias[];
    email: string | null;
    id: string;
    joinDate: string;
    lastOnline: string;
    moderationStatus: string | null;
    name: string;
    profileBannerBlur: string | null;
    profileBannerLg: string | null;
    profileBannerSm: string | null;
    profilePicture: string | null;
    profilePictureBlur: string | null;
    profilePictureLg: string | null;
    profilePictureSm: string | null;
    serviceEmail: string | null;
    steamId: string | null;
    subdomain: string;
    userStatus: APIUserStatus;
}

export interface APIClientUser extends APIUser {
    useMinimalNav: boolean;
    blockedUsers: any[];
    socialLinks: any[];
    userPresenceStatus: number;
    badges: any[];
    canRedeemGold: boolean;
    isUnrecoverable: boolean;
    devices: APIDevice[];
    userChannelNotificationSettings: any[];
    upsell: null;
}
