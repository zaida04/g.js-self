import { APITeamRole } from '@guildedjs/guilded-api-typings';

import Base from './Base';

/**
 * A role belonging to a team
 */
export default class Role extends Base<APITeamRole> {
    /**
     * Update the data in this structure
     * @internal
     */
    patch(data: APITeamRole | Partial<APITeamRole>): this {
        return this;
    }
}
