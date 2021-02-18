import { APITeamRole } from '@guildedjs/guilded-api-typings';

import { Client } from '../..';
import Member from '../Member';
import Role from '../Role';
import BaseManager from './BaseManager';

export default class TeamMemberRoleManager extends BaseManager<APITeamRole, Role> {
    constructor(client: Client, public readonly member: Member) {
        super(client, Role);
    }

    append(role: string | Role): Promise<void> {
        return this.member.team.members.addRoleTo(this.member, role);
    }

    remove(role: string | Role): Promise<void> {
        return this.member.team.members.removeRoleFrom(this.member, role);
    }
}
