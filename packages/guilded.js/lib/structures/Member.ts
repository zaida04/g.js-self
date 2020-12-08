import { APIMember } from '@guildedjs/guilded-api-typings';

import Base from './Base';

export default class Member extends Base<APIMember> {
    patch(data: APIMember | Partial<APIMember>): this {
        return this;
    }
}
