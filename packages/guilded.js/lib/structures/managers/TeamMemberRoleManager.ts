import type { APITeamRole } from '@guildedjs/guilded-api-typings';

import type { Client } from '../Client';
import type {Member} from '../Member';
import {Role} from '../Role';
import {BaseManager} from './BaseManager';

export class TeamMemberRoleManager extends BaseManager<APITeamRole, Role> {
    public constructor(client: Client, public readonly member: Member) {
        super(client, Role, { maxSize: client.options?.cache?.cacheMaxSize?.memberRolesCache });
    }

    /**
     * Shortcut for adding a role to a member.
     * @param role The ID or Role object of the role to add to the member.
     * @see {@link https://guilded.js.org/classes/guilded_js.teammanager.html#addroletomember}
     */
    public append(role: string | Role): Promise<void> {
        return this.client.teams.addRoleToMember(this.member.team!.id, this.member, role);
    }

    /**
     * Shortcut for removing a role from a member.
     * @param role The ID or Role object of the role to add to the member.
     * @see {@link https://guilded.js.org/classes/guilded_js.teammanager.html#removerolefrommember}
     */
    public remove(role: string | Role): Promise<void> {
        return this.client.teams.removeRoleFromMember(this.member.team!.id, this.member, role);
    }
}
