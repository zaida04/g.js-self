import { APITeamChannelRoleOverwrite } from './Overwrite';

export interface APITeamRole {
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

export interface RoleOverwriteById {
    [key: string]: APITeamChannelRoleOverwrite;
}

export type MembershipRole = 'member' | 'admin' | 'formerMember';
