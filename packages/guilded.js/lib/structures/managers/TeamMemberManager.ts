import { APIMember, APIPartialTeam, APITeam } from '@guildedjs/guilded-api-typings';

import { Client } from '../..';
import Member from '../Member';
import Role from '../Role';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamMemberManager extends BaseManager<APIMember, Member> {
    constructor(client: Client, public readonly team: Team) {
        super(client, Member);
    }

    addRoleTo(member: string | Member, role: string | Role): Promise<void> {
        const roleID = role instanceof Role ? role.id : role;
        const memberID = member instanceof Member ? member.id : member;
        return this.client.rest.put(`/teams/${this.team.id}/roles/${roleID}/users/${memberID}`).then(void 0);
    }

    removeRoleFrom(member: string | Member, role: string | Role): Promise<void> {
        const roleID = role instanceof Role ? role.id : role;
        const memberID = member instanceof Member ? member.id : member;
        return this.client.rest.delete(`/teams/${this.team.id}/roles/${roleID}/users/${memberID}`).then(void 0);
    }
}
