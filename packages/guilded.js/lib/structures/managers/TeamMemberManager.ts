import Client from '../Client';
import Member from '../Member';
import Team from '../Team';
import BaseManager from './BaseManager';

export default class TeamMemberManager extends BaseManager<Member> {
    constructor(client: Client, public team: Team) {
        super(client, Member);
    }
}
