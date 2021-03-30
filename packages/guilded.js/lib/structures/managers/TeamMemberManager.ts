import type { APIMember, APIPartialTeam, APITeam } from '@guildedjs/guilded-api-typings';

import type { Client } from '../Client';
import {Member} from '../Member';
import {Role} from '../Role';
import type {Team} from '../Team';
import {BaseManager} from './BaseManager';

export class TeamMemberManager extends BaseManager<APIMember, Member> {
    public constructor(client: Client, public readonly team: Team) {
        super(client, Member, { maxSize: client.options?.cache?.cacheMaxSize?.membersCache });
    }

    public static resolve(member: string | Member): string {
        return member instanceof Member ? member.id : member;
    }

    public addRoleTo(member: string | Member, role: string | Role): Promise<void> {
        return this.client.teams.addRoleToMember(this.team, member, role);
    }

    public removeRoleFrom(member: string | Member, role: string | Role): Promise<void> {
        return this.client.teams.removeRoleFromMember(this.team, member, role);
    }

    public kick(member: string | Member) {
        return this.client.teams.kickMember(this.team, member);
    }

    public setNickname(member: string | Member, newNickname: string) {
        return this.client.teams.setMemberNickname(this.team, member, newNickname);
    }
}
