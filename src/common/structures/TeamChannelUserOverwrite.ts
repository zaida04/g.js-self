import { AllowPermissions, DenyPermissions } from './OverwritePermissions';

export interface TeamChannelUserOverwrite {
    teamId: string;
    channelId: string;
    createdAt: string;
    updatedAt: string | null;
    teamRoleId: number;
    denyPermissions: DenyPermissions;
    allowPermissions: AllowPermissions;
}
