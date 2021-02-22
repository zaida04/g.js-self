import { APIMember, APIPartialTeam, APITeam } from '@guildedjs/guilded-api-typings';

import { Client } from '../..';
import Member from '../Member';
import Role from '../Role';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamMemberManager extends BaseManager<APIMember, Member> {
    public constructor(client: Client, public readonly team: Team) {
        super(client, Member);
    }

    private resolve(member: string | Member): string {
        return member instanceof Member ? member.id : member;
    }

    public addRoleTo(member: string | Member, role: string | Role): Promise<void> {
        const roleID = role instanceof Role ? role.id : role;
        const memberID = this.resolve(member);
        return this.client.rest.put(`/teams/${this.team.id}/roles/${roleID}/users/${memberID}`).then(() => void 0);
    }

    public removeRoleFrom(member: string | Member, role: string | Role): Promise<void> {
        const roleID = role instanceof Role ? role.id : role;
        const memberID = this.resolve(member);
        return this.client.rest.delete(`/teams/${this.team.id}/roles/${roleID}/users/${memberID}`).then(() => void 0);
    }

    public kick(member: string | Member) {
        const memberID = this.resolve(member);
        return this.client.rest.delete(`/teams/${this.team.id}/members/${memberID}`);
    }

    public setNickname(member: string | Member, newNickname: string) {
        if(typeof newNickname !== "string") throw new TypeError("Nickname must be a string!");
        const memberID = this.resolve(member);
        return this.client.rest.put(`/teams/${this.team.id}/members/${memberID}/nickname`, { nickname: newNickname })
    }
}
