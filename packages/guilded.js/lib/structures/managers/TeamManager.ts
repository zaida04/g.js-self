import type { APIPartialTeam, APITeam, APIGetTeam } from '@guildedjs/guilded-api-typings';

import type { Client } from '../Client';
import Member from '../Member';
import Role from '../Role';
import Team from '../Team';
import BaseManager from './BaseManager';
import TeamMemberManager from './TeamMemberManager';

export default class TeamManager extends BaseManager<APITeam | APIPartialTeam, Team> {
    public constructor(client: Client) {
        super(client, Team, { maxSize: client.options?.cache?.cacheMaxSize?.teamsCache });
    }

    public static resolve(team: string | Team): string {
        return team instanceof Team ? team.id : team;
    }

    public addRoleToMember(team: string | Team, member: string | Member, role: string | Role): Promise<void> {
        const roleID = role instanceof Role ? role.id : role;
        const memberID = TeamMemberManager.resolve(member);
        const teamID = TeamManager.resolve(team);
        return this.client.rest.put(`/teams/${teamID}/roles/${roleID}/users/${memberID}`).then(() => void 0);
    }

    public removeRoleFromMember(team: string | Team, member: string | Member, role: string | Role): Promise<void> {
        const roleID = role instanceof Role ? role.id : role;
        const memberID = TeamMemberManager.resolve(member);
        const teamID = TeamManager.resolve(team);
        return this.client.rest.delete(`/teams/${teamID}/roles/${roleID}/users/${memberID}`).then(() => void 0);
    }

    public kickMember(team: string | Team, member: string | Member) {
        const memberID = TeamMemberManager.resolve(member);
        const teamID = TeamManager.resolve(team);
        return this.client.rest.delete(`/teams/${teamID}/members/${memberID}`);
    }

    public setMemberNickname(team: string | Team, member: string | Member, newNickname: string) {
        if(typeof newNickname !== "string") throw new TypeError("Nickname must be a string!");
        const memberID = TeamMemberManager.resolve(member);
        const teamID = TeamManager.resolve(team);
        return this.client.rest.put(`/teams/${teamID}/members/${memberID}/nickname`, { nickname: newNickname })
    }
    /**
     * Fetch a team, will retrieve from cache if exists
     */
    public fetch(id: string, cache = true) {
        const existing = this.cache.get(id);
        if (existing) return existing;

        return this.client.rest.get<APIGetTeam>(`/teams/${id}`).then((data) => {
            let newTeam
            if (cache) {
                newTeam = this.add(data.team);
            } else {
                newTeam = new Team(this.client, data.team);
            }
            return newTeam; 
        })
    }
}
