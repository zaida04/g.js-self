import { APICategory } from '@guildedjs/guilded-api-typings';

import Channel from './Channel';

export default class Category extends Channel {
    patch(data: APICategory | Partial<APICategory>): this {
        return this;
    }
}
