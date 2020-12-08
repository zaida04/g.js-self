import { APIPartialTeam, APITeam } from '@guildedjs/guilded-api-typings';

import Client from '../Client';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamManager extends BaseManager<APITeam | APIPartialTeam, Team> {
    constructor(client: Client) {
        super(client, Team);
    }
}
