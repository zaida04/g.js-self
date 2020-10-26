import { AboutInfo } from './Member';
import { UserStatus } from './UserStatus';

export interface PartialUser {
    id: string;
    name: string;
    badges: string[] | null;
    nickname: string | null;
    addedAt: Date;
    isOwner: boolean;
    channelId: string;
    removedAt: string | null;
    userStatus: UserStatus;
    profilePicture: string;
    profileBannerBlur: string | null;
    userPresenceStatus: number;
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
