import { APIUser } from '@guildedjs/guilded-api-typings';

import Base from './Base';

export default class User extends Base<APIUser> {
    patch(data: APIUser | Partial<APIUser>): this {
        return this;
    }
}
