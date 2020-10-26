import { BaseGroup } from './Group';
import { Measurements } from './Measurements';
import { Member } from './Member';
import { TeamRole } from './Role';
import { Webhook } from './Webhook';

export interface Team {
    additionalGameInfo: unknown;
    additionalInfo: TeamAdditionalInfo;
    alphaInfo: unknown;
    alwaysShowTeamHome: boolean;
    autoSyncDiscordRoles: boolean;
    bannerImages: unknown;
    baseGroup: BaseGroup;
    bio: string | null;
    bots: any[];
    characteristics: string | null;
    createdAt: string;
    customizationInfo: unknown;
    deafenedMembers: any[];
    description: string;
    discordGuildId: string | null;
    discordServerName: string | null;
    flair: any[];
    followerCount: number;
    followingGroups: string[] | null;
    games: any[];
    homeBannerImageLg: string | null;
    homeBannerImageMd: string | null;
    homeBannerImageSm: string | null;
    id: string;
    insightsInfo: unknown;
    isPro: boolean;
    isPublic: boolean;
    isRecruiting: boolean;
    isUserApplicant: boolean;
    isUserBannedFromTeam: boolean;
    isUserInvited: boolean;
    isVerified: boolean;
    lfmStatusByGameId: unknown;
    measurements: Measurements;
    members: Member[];
    mutedMembers: any[];
    name: string;
    notificationPreference: string | null;
    ownerId: string;
    profilePicture: string;
    rankNames: string | null;
    rolesById: {
        [key: string]: TeamRole;
    };
    rolesVersion: number;
    socialInfo: unknown;
    status: string | null;
    subdomain: string;
    subscriptionInfo: string | null;
    teamDashImage: string | null;
    teamPreferences: string | null;
    timezone: string;
    type: string;
    upsell: null;
    userFollowsTeam: boolean;
    webhooks: Webhook[];
}

export interface TeamAdditionalInfo {
    platform: string;
}
