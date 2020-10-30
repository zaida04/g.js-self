import { Alias } from './Alias';
import { Device } from './ExtraInfo';
import { AboutInfo } from './Member';
import { UserStatus } from './UserStatus';

export interface User {
    subdomain: string;
    aliases: Alias[];
    email?: string;
    profilePictureSm: string;
    profilePictureLg?: string;
    profilePictureBlur: string;
    profileBannerLg?: null;
    profileBannerSm?: null;
    joinDate: string;
    steamId: null;
    moderationStatus: null;
    aboutInfo: AboutInfo;
    lastOnline: string;
    useMinimalNav?: boolean;
    blockedUsers?: any[];
    socialLinks: any[];
    canRedeemGold?: boolean;
    isUnrecoverable?: boolean;
    devices?: Device[];
    userChannelNotificationSettings: any[];
    upsell: null;
    id: string;
    name: string;
    badges: string[] | null;
    nickname: string | null;
    addedAt: Date;
    isOwner?: boolean;
    channelId?: string;
    removedAt: string | null;
    userStatus: UserStatus;
    profilePicture: string;
    profileBannerBlur: string | null;
    userPresenceStatus?: number;
}

export interface ClientUser {
    id: string;
    name: string;
    profilePictureSm: string | null;
    profilePicture: string | null;
    profilePictureLg: string | null;
    profilePictureBlur: string | null;
    profileBannerBlur: string | null;
    profileBannerLg: string | null;
    joinDate: string;
    steamId: string | null;
    subdomain: string | null;
    moderationStatus: string | null;
    aboutInfo: AboutInfo;
    lastOnline: string | null;
}
