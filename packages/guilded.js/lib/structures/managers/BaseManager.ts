import Collection from '@discordjs/collection';
import { createDecipher } from 'crypto';

import { BaseData, Constructable } from '../../typings';
import Base from '../Base';
import Client from '../Client';

/**
 * The manager in charge of cached objects and potential api endpoints
 * @param K The base amount of data required to construct object T
 * @param T The object that will be held in this manager
 */
export default class BaseManager<K extends BaseData, T extends Base<K>> {
    public cache: Collection<string, T> = new Collection();
    constructor(public readonly client: Client, public readonly holds: Constructable<T>) {}

    /**
     * Add an object, potential data, or constructor params into this managers cache
     * @private
     */
    public add(data: T | K | Partial<K> | ConstructorParameters<Constructable<T>>): T | null {
        if (this.isConstructorParamsOfHolds(data)) {
            const addition = new this.holds(this.client, ...data);
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
