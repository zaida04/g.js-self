import { UserStatus } from './UserStatus';

export interface APIUser {
    id: string;
    name: string;
    badges: null;
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
