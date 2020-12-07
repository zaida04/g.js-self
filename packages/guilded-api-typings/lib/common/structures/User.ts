import { APIAlias } from './Alias';
import { Device } from './ExtraInfo';
import { AboutInfo } from './Member';
import { APIUserStatus } from './UserStatus';

export interface APIUser {
    aboutInfo: AboutInfo;
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
    devices: Device[];
    userChannelNotificationSettings: any[];
    upsell: null;
}
