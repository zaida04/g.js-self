import { APIGroup } from '@guildedjs/guilded-api-typings';

import Client from '../Client';
import Group from '../Group';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamGroupManager extends BaseManager<APIGroup, Group> {
    public constructor(client: Client, public readonly team: Team) {
        super(client, Group);
    }
}
