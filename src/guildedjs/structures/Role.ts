import { BaseData } from '../typings/BaseData';
import Base from './Base';
import Client from './Client';
import Team from './Team';

export default class Role extends Base {
    public name: string | null = null;
    public color: string | null = null;
    public priority: string | null = null;
    public createdAt: Date | null = null;
    public updatedAt: Date | null = null;
    public permissions: string | null = null;
    public mentionable: boolean | null = null;
    public selfAssignable: boolean | null = null;

    constructor(client: Client, data: BaseData, public team: Team) {
        super(client, data);
        this._patch(data);
    }

    _patch(data: any): this {
        if ('name' in data) this.name = data.name;
        if ('color' in data) this.color = data.color;
        if ('priority' in data) this.priority = data.priority;
        if ('createdAt' in data) this.createdAt = new Date(data.createdAt);
        if ('updatedAt' in data) this.updatedAt = new Date(data.updatedAt);
        if ('permissions' in data) this.permissions = data.permissions;
        if ('mentionable' in data) this.mentionable = data.mentionable;
        if ('selfAssignable' in data) this.selfAssignable = data.selfAssignable;

        return this;
    }
}
