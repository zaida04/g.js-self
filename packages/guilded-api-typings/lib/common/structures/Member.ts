import { APIAlias } from './Alias';
import { MembershipRole } from './Role';
import { APIUserStatus } from './UserStatus';

export interface APIMember {
    id: string;
    name: string;
    nickname: string | null;
    badges: string[] | null;
    joinDate: string;
    membershipRole: MembershipRole;
    lastOnline: string | null;
    profilePicture: null | string;
    profileBannerBlur: null | string;
    aboutInfo: AboutInfo | null;
    userStatus: APIUserStatus;
    socialLinks: SocialLink[] | null;
    roleIds: number[] | null;
    subscriptionType: string | null;
    aliases: APIAlias[];
    userPresenceStatus: number;
    teamXp: number;
}

export interface AboutInfo {
    bio?: string;
    tagLine?: string;
}

export interface SocialLink {
    type: SocialLinkSource;
    handle: null | string;
    additionalInfo: SocialLinkAdditionalInfo;
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

export interface SocialLinkAdditionalInfo {
    channelName?: string;
}
