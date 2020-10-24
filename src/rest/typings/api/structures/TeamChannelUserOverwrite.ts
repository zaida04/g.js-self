import { AllowPermissions, DenyPermissions } from './PermissionGrant';

export interface TeamChannelUserOverwrite {
    teamId: string;
    channelId: string;
    createdAt: string;
    updatedAt: null;
    teamRoleId: number;
    denyPermissions: DenyPermissions;
    allowPermissions: AllowPermissions;
}
