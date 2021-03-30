import type { APITeamRole } from '@guildedjs/guilded-api-typings';

import type { Client } from '../Client';
import type {Member} from '../Member';
import {Role} from '../Role';
import {BaseManager} from './BaseManager';

export class TeamMemberRoleManager extends BaseManager<APITeamRole, Role> {
    public constructor(client: Client, public readonly member: Member) {
        super(client, Role, { maxSize: client.options?.cache?.cacheMaxSize?.memberRolesCache });
    }

    public append(role: string | Role): Promise<void> {
        return this.client.teams.addRoleToMember(this.member.team!.id, this.member, role);
    }

    public remove(role: string | Role): Promise<void> {
        return this.client.teams.removeRoleFromMember(this.member.team!.id, this.member, role);
    }
}
