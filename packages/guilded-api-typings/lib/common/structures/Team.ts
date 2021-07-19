import { APITeamChannelRoleOverwrite } from './Channel';
import { APIAboutInfo, APIAlias, APISocialLink, APIUserStatus } from './User';
import { APIWebhook } from './Webhook';

export interface APITeam {
    additionalGameInfo: unknown;
    additionalInfo: {
        platform: string;
    };
    alphaInfo: unknown;
    alwaysShowTeamHome: boolean;
    autoSyncDiscordRoles: boolean;
    bannerImages: unknown;
    baseGroup: APIGroup;
    bio: string | null;
    bots: unknown[];
    canInviteMembers?: boolean;
    canManageTournaments?: boolean;
    canUpdateTeam?: boolean;
    characteristics: string | null;
    createdAt: string;
    customizationInfo: unknown;
    deafenedMembers?: unknown[];
    description: string;
    discordGuildId: string | null;
    discordServerName: string | null;
    flair: unknown[];
    followerCount: number;
    followingGroups: string[] | null;
    games: unknown[];
    homeBannerImageLg: string | null;
    homeBannerImageMd: string | null;
    homeBannerImageSm: string | null;
    id: string;
    insightsInfo: unknown;
    isAdmin?: boolean;
    isFavorite?: boolean;
    isPro: boolean;
    isPublic: boolean;
    isRecruiting: boolean;
    isUserApplicant: boolean;
    isUserBannedFromTeam: boolean;
    isUserInvited: boolean;
    isVerified: boolean;
    lfmStatusByGameId: unknown;
    measurements: APIMeasurements;
    members: APIMember[];
    mutedMembers: string[];
    memberCount?: string;
    membershipRole: string;
    name: string;
    notificationPreference: string | null;
    ownerId: string;
    profilePicture: string;
    rankNames: string | null;
    roleIds?: number[] | null;
    rolesById: {
        [key: string]: APITeamRole;
    };
    rolesVersion: number;
    socialInfo: unknown;
    status: string | null;
    subdomain: string;
    subscriptionInfo: string | null;
    teamDashImage: string | null;
    teamPreferences: string | null;
    timezone: string | null;
    type: string | null;
    upsell: null;
    userFollowsTeam: boolean;
    webhooks: APIWebhook[];
}

export interface APIPartialTeam {
    id: string;
    name: string;
    subdomain: string;
    activity: unknown[];
    games: string[] | null[];
    profilePicture: string;
    teamDashImage: string;
    homeBannerImageSm: string;
    homeBannerImageMd: string;
    homeBannerImageLg: string;
    gameIds: string[] | null;
    bannerImages: string[] | null[];
    memberCount: number;
}

export interface APITeamBan {
    reason: string;
    userId: string;
    bannedBy: string;
    createdAt: string;
}

export interface APITeamRole {
    id: string;
    name: string;
    color: string;
    priority: number;
    permissions: RolePermissions;
    isBase: boolean;
    teamId: string;
    createdAt: string;
    updatedAt: string | null;
    isMentionable: boolean;
    discordRoleId: string | null;
    discordSyncedAt: string | null;
    isSelfAssignable: boolean;
    isDisplayedSeparately: boolean;
}

export interface APIGroup {
    id: string;
    name: string;
    description: string | null;
    priority: string | null;
    type: string;
    avatar: string | null;
    banner: string | null;
    teamId: string;
    gameId: string | null;
    visibilityTeamRoleId: number;
    membershipTeamRoleId: number;
    isBase: boolean;
    additionalGameInfo: unknown;
    createdBy: string | null;
    createdAt: string;
    updatedBy: string | null;
    updatedAt: string | null;
    deletedAt: string | null;
    customReactionId: string | null;
    isPublic: boolean;
    archivedAt: string | null;
    archivedBy: string | null;
}

export interface APIMeasurements {
    numMembers: number;
    numFollowers: number;
    numRecentMatches: number;
    numRecentMatchWins: number;
    matchmakingGameRanks: unknown[];
    numFollowersAndMembers: number;
    numMembersAddedInLastDay: number;
    numMembersAddedInLastWeek: number;
    mostRecentMemberLastOnline: number;
    numMembersAddedInLastMonth: number;
    subscriptionMonthsRemaining: number | null;
}

export interface RoleOverwriteById {
    [key: string]: APITeamChannelRoleOverwrite;
}

/*
    Taken from: https://github.com/Skillz4Killz/gapi/blob/master/src/lib/Team.ts#L181
    GAPI created by https://github.com/Skillz4Killz, LICENSED under Apache License 2.0
*/
export interface RolePermissions extends Record<string, number> {
    chat: 119;
    docs: 15;
    forms: 18;
    lists: 63;
    media: 15;
    voice: 8179;
    forums: 123;
    general: 15412;
    calendar: 31;
    scheduling: 11;
    matchmaking: 1;
    recruitment: 55;
    announcements: 7;
    customization: 49;
}

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
    aboutInfo: APIAboutInfo | null;
    userStatus: APIUserStatus;
    socialLinks: APISocialLink[] | null;
    roleIds: number[] | null;
    subscriptionType: string | null;
    aliases: APIAlias[];
    userPresenceStatus: number;
    teamXp: number;
}

export type MembershipRole = 'member' | 'admin' | 'formerMember';
