import { APIChannel } from '@guildedjs/guilded-api-typings';

import Channel from './Channel';
import TextBasedChannel from './TextBasedChannel';

export default class TextChannel extends TextBasedChannel {
    patch(data: APIChannel | Partial<APIChannel>): this {
        return this;
    }
}
