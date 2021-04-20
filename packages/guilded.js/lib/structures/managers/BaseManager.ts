import type { BaseData, Constructable } from '../../typings';
import { CacheCollection, CacheCollectionOptions } from '../../util/CacheCollection';
import { Base } from '../Base';
import type { Client } from '../Client';

/**
 * The manager in charge of cached objects and potential api endpoints
 * @param K The base amount of data required to construct object T
 * @param T The object that will be held in this manager
 */
export class BaseManager<K extends BaseData, T extends Base<K>> {
    public cache: CacheCollection<string, T> = new CacheCollection(this.cacheOptions ?? {});
    public constructor(
        public readonly client: Client,
        public readonly holds: Constructable<T>,
        public readonly cacheOptions?: CacheCollectionOptions,
    ) {}

    /**
     * Add an object, potential data, or constructor params into this managers cache
     * @private
     */
    public add(data: T | K | Partial<K> | ConstructorParameters<Constructable<T>>): T | null {
        if (this.isConstructorParamsOfHolds(data)) {
            const addition = new this.holds(...data);
            this.cache.set(addition.id.toString(), addition);
            return addition;
        } else if (this.isInstanceOfHolds(data)) {
            this.cache.set(data.id.toString(), data);
            return data;
        } else {
            const existing = data.id ? this.cache.get(data.id.toString()) : null;
            if (existing) {
                existing.patch(data);
            }
            return existing ?? null;
        }
    }

    private isConstructorParamsOfHolds(
        data: ConstructorParameters<Constructable<T>> | any,
    ): data is ConstructorParameters<Constructable<T>> {
        return Array.isArray(data);
    }

    private isInstanceOfHolds(data: T | K | Partial<K>): data is T {
        return data instanceof this.holds;
    }
}
