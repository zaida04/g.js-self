import type { APITeamRole } from '@guildedjs/guilded-api-typings';

import type { Client } from '../Client';
import { Role } from '../Role';
import { Team } from '../Team';
import { BaseManager } from './BaseManager';

export class TeamRoleManager extends BaseManager<APITeamRole, Role> {
    public constructor(client: Client, public readonly team: Team) {
        super(client, Role, { maxSize: client.options?.cache?.cacheMaxSize?.memberRolesCache });
    }
}
