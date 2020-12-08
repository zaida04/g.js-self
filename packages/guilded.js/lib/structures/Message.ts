import { APIMessage } from '@guildedjs/guilded-api-typings';

import Base from './Base';

export default class Message extends Base<APIMessage> {
    patch(data: APIMessage | Partial<APIMessage>): this {
        return this;
    }
}
