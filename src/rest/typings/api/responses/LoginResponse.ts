export interface LoginResponse {
    user: {
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
        aboutInfo: {
            tagLine: 'string' | null;
        };
        lastOnline: string | null;
    };
}
