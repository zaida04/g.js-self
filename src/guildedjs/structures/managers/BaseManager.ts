import Collection from '@discordjs/collection';
import { Constructable } from '../../typings/Constructable';
import Base from '../Base';
import Client from '../Client';

export default abstract class BaseManager<T extends Base> {
    public cache: Collection<string, T> = new Collection();

    // eslint-disable-next-line no-useless-constructor
    public constructor(public readonly client: Client, public holds: Constructable<T>) {}
    public add(data: T | any): T {
        if (data instanceof this.holds) {
            this.cache.set(data.id, data);
            return data;
        } else {
            const existing = this.cache.get(data.id);
            if (existing) return existing._patch(data);
            const structure = new this.holds(this.client, data);
            this.cache.set(structure.id, structure);
            return structure;
        }
    }
}
