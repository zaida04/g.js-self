import { APITextBasedChannel } from '@guildedjs/guilded-api-typings';

import Channel from './Channel';

export default class TextBasedChannel extends Channel {
    patch(data: APITextBasedChannel | Partial<APITextBasedChannel>): this {
        return this;
    }
}
