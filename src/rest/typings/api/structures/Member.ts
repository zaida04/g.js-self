import { Alias } from './Alias';
import { MembershipRole } from './Role';
import { UserStatus } from './UserStatus';

export interface Member {
    id: string;
    name: string;
    nickname: string | null;
    badges: string[] | null;
    joinDate: string;
    membershipRole: MembershipRole;
    lastOnline: string;
    profilePicture: null | string;
    profileBannerBlur: null | string;
    aboutInfo: AboutInfo | null;
    userStatus: UserStatus;
    socialLinks: SocialLink[] | null;
    roleIds: number[] | null;
    subscriptionType: null;
    aliases: Alias[];
    userPresenceStatus: number | string;
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
