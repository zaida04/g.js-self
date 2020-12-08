import { APITeamRole } from '@guildedjs/guilded-api-typings';

import Base from './Base';

export default class Role extends Base<APITeamRole> {
    patch(data: APITeamRole | Partial<APITeamRole>): this {
        return this;
    }
}
