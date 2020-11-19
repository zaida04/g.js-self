export interface APIBaseGroup {
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
