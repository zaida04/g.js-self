export interface Measurements {
    numMembers: number;
    numFollowers: number;
    numRecentMatches: number;
    numRecentMatchWins: number;
    matchmakingGameRanks: any[];
    numFollowersAndMembers: number;
    numMembersAddedInLastDay: number;
    numMembersAddedInLastWeek: number;
    mostRecentMemberLastOnline: number;
    numMembersAddedInLastMonth: number;
    subscriptionMonthsRemaining: number | null;
}
