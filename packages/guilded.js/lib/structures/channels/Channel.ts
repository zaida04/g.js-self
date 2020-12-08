import { APIChannel } from '@guildedjs/guilded-api-typings';

import Base from '../Base';

export default abstract class Channel extends Base<APIChannel> {
    public id!: string | number;
    public name!: string | null;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
}
