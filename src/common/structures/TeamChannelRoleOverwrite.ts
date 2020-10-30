import { AllowPermissions, DenyPermissions } from './OverwritePermissions';

export interface TeamChannelRoleOverwrite {
    teamId: string;
    createdAt: string;
    updatedAt: string;
    teamRoleId: number;
    denyPermissions: DenyPermissions;
    allowPermissions: AllowPermissions;
    channelCategoryId: number;
}
