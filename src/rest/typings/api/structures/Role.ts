export interface TeamRole {
    id: number;
    name: string;
    color: string;
    priority: number;
    permissions: { [key: string]: number };
    isBase: boolean;
    teamId: string;
    createdAt: string;
    updatedAt: string | null;
    isMentionable: boolean;
    discordRoleId: null;
    discordSyncedAt: null;
    isSelfAssignable: boolean;
    isDisplayedSeparately: boolean;
}

export type MembershipRole = 'member' | 'admin' | 'formerMember';
