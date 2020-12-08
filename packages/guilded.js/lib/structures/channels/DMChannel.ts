import { APIChannel, APIDMChannel } from '@guildedjs/guilded-api-typings';

import Channel from './Channel';
import TextBasedChannel from './TextBasedChannel';

export default class DMChannel extends TextBasedChannel {
    patch(data: APIDMChannel | Partial<APIDMChannel>): this {
        return this;
    }
}
