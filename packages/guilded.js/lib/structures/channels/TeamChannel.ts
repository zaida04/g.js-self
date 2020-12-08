import { APIChannel, APITeamChannel } from '@guildedjs/guilded-api-typings';

import Channel from './Channel';

export default class TeamChannel extends Channel {
    patch(data: APITeamChannel | Partial<APITeamChannel>): this {
        return this;
    }
}
