import { APIClientUser } from '@guildedjs/guilded-api-typings';

import Base from './Base';

export default class ClientUser extends Base<APIClientUser> {
    patch(data: APIClientUser | Partial<APIClientUser>): this {
        return this;
    }
}
