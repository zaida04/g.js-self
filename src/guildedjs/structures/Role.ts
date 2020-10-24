import { BaseData } from '../typings/BaseData';
import Base from './Base';
import Client from './Client';
import Team from './Team';

export default class Role extends Base {
    public name: string | null = null;
    public color: string | null = null;
    public priority: string | null = null;
    public createdAt: Date | null = null;
    public updatedAt: string | null = null;
    public permissions: string | null = null;
    public mentionable: boolean | null = null;
    public selfAssignable: boolean | null = null;

    constructor(client: Client, data: BaseData, public team: Team) {
        super(client, data);
    }

    _patch(data: any): this {
        return this;
    }
}
