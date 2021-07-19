import Collection from '@discordjs/collection';

/**
 * A collection with a max cap size, which will remove a random element
 */
export class CacheCollection<K, V> extends Collection<K, V> {
    public maxSize: number;

    public constructor(
        { maxSize = Infinity }: CacheCollectionOptions,
        entries?: readonly (readonly [K, V])[] | null | undefined,
    ) {
        super(entries);
        this.maxSize = maxSize;
    }

    public set(...args: Parameters<typeof Collection.prototype['set']>): this {
        if (this.size >= this.maxSize) this.delete(this.randomKey());
        return super.set(...args);
    }
}

export interface CacheCollectionOptions {
    maxSize?: number;
}
