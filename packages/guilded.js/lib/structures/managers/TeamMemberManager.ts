import { APIMember, APIPartialTeam, APITeam } from '@guildedjs/guilded-api-typings';

import { Client } from '../..';
import Member from '../Member';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamMemberManager extends BaseManager<APIMember, Member> {
    constructor(client: Client, public readonly team: Team) {
        super(client, Member);
    }
}
