import { AllowPermissions, DenyPermissions } from './PermissionGrant';

export interface TeamChannelRoleOverwrite {
    teamId: string;
    createdAt: string;
    updatedAt: string;
    teamRoleId: number;
    denyPermissions: DenyPermissions;
    allowPermissions: AllowPermissions;
    channelCategoryId: number;
}
