import type {
    APIGetTeam,
    APIPartialTeam,
    APIPostCreateInviteResult,
    APITeam,
    CHANNEL_CONTENT_TYPES,
} from '@guildedjs/guilded-api-typings';

import { TeamChannel } from '../Channel';
import type { Client } from '../Client';
import { Group } from '../Group';
import { Member } from '../Member';
import { Role } from '../Role';
import { Team } from '../Team';
import { BaseManager } from './BaseManager';
import { TeamGroupManager } from './TeamGroupManager';
import { TeamMemberManager } from './TeamMemberManager';

export class TeamManager extends BaseManager<APITeam | APIPartialTeam, Team> {
    public constructor(client: Client) {
        super(client, Team, { maxSize: client.options?.cache?.cacheMaxSize?.teamsCache });
    }

    public static resolve(team: string | Team): string {
        return team instanceof Team ? team.id : team;
    }

    /**
     * Add a role to a TeamMember
     * @param team The ID or team object of the Team the target member is in.
     * @param member The ID or member object of the Member that will have the role added to them.
     * @param role The ID or role object of the Role to add to the member.
     */
    public addRoleToMember(team: string | Team, member: string | Member, role: string | Role): Promise<void> {
        const roleID = role instanceof Role ? role.id : role;
        const memberID = TeamMemberManager.resolve(member);
        const teamID = TeamManager.resolve(team);
        return this.client.rest.put(`/teams/${teamID}/roles/${roleID}/users/${memberID}`).then(() => void 0);
    }

    /**
     * Remove a role from a TeamMember
     * @param team The ID or team object of the Team the target member is in.
     * @param member The ID or member object of the Member that will have the role removed from them.
     * @param role The ID or role object of the Role to remove from the member.
     */
    public removeRoleFromMember(team: string | Team, member: string | Member, role: string | Role): Promise<void> {
        const roleID = role instanceof Role ? role.id : role;
        const memberID = TeamMemberManager.resolve(member);
        const teamID = TeamManager.resolve(team);
        return this.client.rest.delete(`/teams/${teamID}/roles/${roleID}/users/${memberID}`).then(() => void 0);
    }

    /**
     * Kick a TeamMember
     * @param team The ID or team object of the Team the target member is in.
     * @param member The ID or member object of the Member that will be kicked
     */
    public kickMember(team: string | Team, member: string | Member): Promise<void> {
        const memberID = TeamMemberManager.resolve(member);
        const teamID = TeamManager.resolve(team);
        return this.client.rest.delete(`/teams/${teamID}/members/${memberID}`).then(() => void 0);
    }

    /**
     * Set a TeamMember's name
     * @param team The ID or team object of the Team the target member is in.
     * @param member The ID or member object of the Member that will be renamed.
     * @param newNickname The new nickname to give to the Member.
     */
    public setMemberNickname(team: string | Team, member: string | Member, newNickname: string): Promise<void> {
        if (typeof newNickname !== 'string') throw new TypeError('Nickname must be a string!');
        const memberID = TeamMemberManager.resolve(member);
        const teamID = TeamManager.resolve(team);
        return this.client.rest
            .put(`/teams/${teamID}/members/${memberID}/nickname`, { nickname: newNickname })
            .then(() => void 0);
    }

    /**
     * Creates an Invite for the Team
     * @param team The ID or team object of the Team.
     * @returns The ID of the created Invite
     */
    public createInvite(team: string | Team): Promise<APIPostCreateInviteResult> {
        const teamID = TeamManager.resolve(team);
        return this.client.rest.post(`/teams/${teamID}/invites`, { teamId: teamID }).then(x => x.invite);
    }

    public deleteInvite(team: string | Team, inviteID: string): Promise<string> {
        if (typeof inviteID !== 'string') throw new TypeError('InviteID must be a string!');
        const teamID = TeamManager.resolve(team);
        return this.client.rest.delete(`/teams/${teamID}/invites/${inviteID}`).then(x => x.id);
    }

    /**
     * Creates a Teamchannel
     * @param team
     * @param group
     * @param name
     * @param contentType
     * @param channelCategoryId
     * @param isPublic
     * @returns
     */

    public createChannel(
        team: string | Team,
        group: string | Group,
        name: string,
        contentType: CHANNEL_CONTENT_TYPES,
        channelCategoryId: number | null = null,
        isPublic = false,
    ): Promise<TeamChannel> {
        if (typeof name !== 'string') {
            throw new TypeError('Name must be a string!');
        }
        const teamID = TeamManager.resolve(team);
        const groupID = TeamGroupManager.resolve(group);
        return this.client.rest.post(`/teams/${teamID}/groups/${groupID}`, {
            channelCategoryId,
            contentType,
            isPublic,
            name,
        });
        // .then(x => new TeamChannel(this.client, x, null, null));
    }

    /**
     * Fetch a team, will retrieve from cache if exists
     * @param id the ID of the team to fetch.
     * @param cache Whether to cache the fetched Team or not.
     */
    public fetch(id: string, cache = true): Promise<Team> {
        return this.client.rest.get<APIGetTeam>(`/teams/${id}`).then(data => {
            const cachedTeam = this.client.teams.cache.get(id);

            if (cache && cachedTeam) {
                cachedTeam.patch(data.team);
                for (const member of data.team.members) {
                    const existingMember = cachedTeam.members.cache.get(member.id);
                    if (existingMember) existingMember.patch(member);
                    else cachedTeam.members.cache.set(member.id, new Member(this.client, member, cachedTeam));
                }
            }

            return cachedTeam ?? new Team(this.client, data.team);
        });
    }
}
