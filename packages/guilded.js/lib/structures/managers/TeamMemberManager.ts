import type { APIMember } from '@guildedjs/guilded-api-typings';

import type { Client } from '../Client';
import { Member } from '../Member';
import type { Team } from '../Team';
import { BaseManager } from './BaseManager';

export class TeamMemberManager extends BaseManager<APIMember, Member> {
    public constructor(client: Client, public readonly team: Team) {
        super(client, Member, { maxSize: client.options?.cache?.cacheMaxSize?.membersCache });
    }

    public static resolve(member: string | Member): string {
        return member instanceof Member ? member.id : member;
    }
}
