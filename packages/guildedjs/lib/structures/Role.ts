import { APITeamRole } from '@guildedjs/guilded-api-typings';

import Base from './Base';
import Client from './Client';
import Team from './Team';

export default class Role extends Base {
    public name!: string;
    public color!: string;
    public priority!: number;
    public createdAt!: Date;
    public updatedAt!: Date | null;
    public permissions!: { [key: string]: number };
    public mentionable!: boolean;
    public selfAssignable!: boolean;
    public hoisted!: boolean;
    public team: Team;

    constructor(client: Client, team: Team, data: APITeamRole) {
        super(client, data);
        this.team = team;
        this._patch(data);
    }

    _patch(data: APITeamRole): this {
        if ('name' in data) this.name = data.name;
        if ('color' in data) this.color = data.color;
        if ('priority' in data) this.priority = data.priority;
        if ('createdAt' in data) this.createdAt = new Date(data.createdAt);
        if ('updatedAt' in data) this.updatedAt = data.updatedAt ? new Date(data.updatedAt) : null;
        if ('permissions' in data) this.permissions = data.permissions;
        if ('isMentionable' in data) this.mentionable = data.isMentionable;
        if ('isDisplayedSeparately' in data) this.hoisted = data.isDisplayedSeparately;
        if ('isSelfAssignable' in data) this.selfAssignable = data.isSelfAssignable;

        return this;
    }
}
