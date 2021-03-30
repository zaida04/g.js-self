import type { APITeamRole, RolePermissions } from '@guildedjs/guilded-api-typings';

import {Base} from './Base';
import type { Client } from "./Client";
import type {Team} from './Team';

/**
 * A role belonging to a team
 */
export class Role extends Base<APITeamRole> {
    public mentionable!: boolean;
    public permissions!: RolePermissions;
    public hoisted!: boolean;
    public discord: { roleID: string | null, syncedAt: Date | null };
    public selfAssignable!: boolean;
    public readonly createdAt: Date;
    public readonly teamID: string;
    public updatedAt: Date | null;
    public priority!: number;
    public color!: string;
    public name!: string;

    public constructor(client: Client, data: APITeamRole, private _team: Team | null) {
        super(client, data);
        this.discord = { roleID: null, syncedAt: null };
        this.createdAt = new Date(data.createdAt);
        this.updatedAt = null;
        this.teamID = data.teamId;
        this.patch(data);
    }

    get team(): Team | null {
        if(!this._team) return this._team;
        const cachedTeam = this.client.teams.cache.get(this.teamID);
        if(!cachedTeam) return null;        
        this._team = cachedTeam;
        return cachedTeam;
    }
    
    /**
     * Update the data in this structure
     * @internal
     */
    public patch(data: APITeamRole | Partial<APITeamRole>): this {
        if("permissions" in data && data.permissions) this.permissions = data.permissions;
        if("isMentionable" in data && data.isMentionable) this.mentionable = data.isMentionable;
        if("isDisplayedSeparately" in data && data.isDisplayedSeparately) this.hoisted = data.isDisplayedSeparately;
        if("discordRoleId" in data && data.discordRoleId !== undefined) this.discord.roleID = data.discordRoleId;
        if("discordSyncedAt" in data && data.discordSyncedAt !== undefined) this.discord.syncedAt = data.discordSyncedAt ? new Date(data.discordSyncedAt) : null;
        if("isSelfAssignable" in data && data.isSelfAssignable) this.selfAssignable = data.isSelfAssignable;
        if("updatedAt" in data && data.updatedAt !== undefined) this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        if("priority" in data && data.priority) this.priority = data.priority;
        if("color" in data && data.color) this.color = data.color;
        if("name" in data && data.name) this.name = data.name;

        return this;
    }
}
