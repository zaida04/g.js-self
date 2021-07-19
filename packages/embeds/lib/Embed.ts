/* eslint-disable @typescript-eslint/naming-convention */
import { APIEmbed } from '@guildedjs/guilded-api-typings';

export class Embed {
    public title: string | null;
    public description: string | null;
    public url: string | null;
    public timestamp: string | null;
    public timestampRaw: number | null;
    public color: number | null;
    public footer: {
        text: string;
        iconURL: string | null;
        proxyIconURL: string | null;
    } | null;
    public image: APIEmbedMediaData | null;
    public thumbnail: APIEmbedMediaData | null;
    public video: APIEmbedMediaData | null;
    public provider: {
        name: string | null;
        url: string | null;
    } | null;
    public author: {
        name: string | null;
        iconURL: string | null;
        url: string | null;
        proxyIconURL: string | null;
    } | null;
    public fields: {
        inline: boolean | null;
        name: string;
        value: string;
    }[];
    private raw?: Partial<APIEmbed>;

    public constructor(data?: Partial<APIEmbed>) {
        this.footer = null;
        this.image = null;
        this.thumbnail = null;
        this.author = null;
        this.fields = [];
        this.video = null;
        this.provider = null;
        this.color = null;
        this.timestamp = null;
        this.timestampRaw = null;
        this.description = null;
        this.url = null;
        this.title = null;
        this.raw = data;

        if (data) {
            if ('footer' in data) {
                this.footer = data.footer
                    ? {
                          iconURL: data.footer.icon_url ?? null,
                          proxyIconURL: data.footer.proxy_icon_url ?? null,
                          text: data.footer.text ?? null,
                      }
                    : null;
            }

            if ('image' in data) {
                this.image = data.image
                    ? {
                          height: data.image.height ?? null,
                          proxyURL: data.image.proxy_url ?? null,
                          url: data.image.url,
                          width: data.image.width ?? null,
                      }
                    : null;
            }

            if ('thumbnail' in data) {
                this.thumbnail = data.thumbnail
                    ? {
                          height: data.thumbnail.height ?? null,
                          proxyURL: data.thumbnail.proxy_url ?? null,
                          url: data.thumbnail.url,
                          width: data.thumbnail.width ?? null,
                      }
                    : null;
            }

            if ('author' in data) {
                this.author = data.author
                    ? {
                          iconURL: data.author.icon_url ?? null,
                          name: data.author.name ?? null,
                          proxyIconURL: data.author.proxy_icon_url ?? null,
                          url: data.author.url ?? null,
                      }
                    : null;
            }

            if ('fields' in data) {
                this.fields =
                    data.fields?.map(field => ({
                        inline: field.inline ?? false,
                        name: field.name,
                        value: field.value,
                    })) ?? [];
            }

            if ('color' in data) {
                this.color = data.color ?? null;
            }

            if ('timestamp' in data) {
                this.timestamp = data.timestamp ? new Date(data.timestamp).toISOString() : null;
                this.timestampRaw = data.timestamp ? Date.parse(data.timestamp) : null;
            }

            if ('description' in data) {
                this.description = data.description ?? null;
            }

            if ('url' in data) {
                this.url = data.url ?? null;
            }

            if ('video' in data) {
                this.video = data.video
                    ? {
                          height: data.video.height ?? null,
                          proxyURL: data.video.proxy_url ?? null,
                          url: data.video.url,
                          width: data.video.width ?? null,
                      }
                    : null;
            }

            if ('provider' in data) {
                this.provider = data.provider
                    ? {
                          name: data.provider.name ?? null,
                          url: data.provider.url ?? null,
                      }
                    : null;
            }
        }
    }

    public setTitle(title: string): this {
        this.title = title;
        return this;
    }

    public setDescription(description: string): this {
        this.description = description;
        return this;
    }

    public setURL(url: string): this {
        this.url = url;
        return this;
    }

    public setTimestamp(timestamp?: string | number | Date): this {
        if (!timestamp) {
            return this.setTimestamp(new Date());
        }
        const isTimestampDateObject = timestamp instanceof Date;

        this.timestamp = isTimestampDateObject
            ? (timestamp as Date).toISOString()
            : Number.isInteger(timestamp) || typeof timestamp === 'string'
            ? new Date(timestamp).toISOString()
            : null;
        this.timestampRaw = isTimestampDateObject
            ? (timestamp as Date).getTime()
            : Number.isInteger(timestamp)
            ? new Date(timestamp).getTime()
            : Date.parse(timestamp as string);
        return this;
    }

    public setColor(color: number): this {
        this.color = color;
        return this;
    }

    public setFooter(text: string, iconURL?: string, proxyIconURL?: string): this {
        this.footer = { iconURL: iconURL ?? null, proxyIconURL: proxyIconURL ?? null, text };
        return this;
    }

    public setImage(url: string, height?: string, width?: string, proxyURL?: string): this {
        this.image = { height: height ?? null, proxyURL: proxyURL ?? null, url, width: width ?? null };
        return this;
    }

    public setThumbnail(url: string, height?: string, width?: string, proxyURL?: string): this {
        this.thumbnail = { height: height ?? null, proxyURL: proxyURL ?? null, url, width: width ?? null };
        return this;
    }

    public setVideo(url: string, height?: string, width?: string, proxyURL?: string): this {
        this.video = { height: height ?? null, proxyURL: proxyURL ?? null, url, width: width ?? null };
        return this;
    }

    public setProvider(name?: string, url?: string): this {
        this.provider = { name: name ?? null, url: url ?? null };
        return this;
    }

    public setAuthor(name?: string, iconURL?: string, url?: string, proxyIconURL?: string): this {
        this.author = {
            iconURL: iconURL ?? null,
            name: name ?? null,
            proxyIconURL: proxyIconURL ?? null,
            url: url ?? null,
        };
        return this;
    }

    public addFields(fields: { name: string; value: string; inline?: boolean }[]): this {
        this.fields.push(
            ...fields.map(field => ({
                inline: field.inline ?? false,
                name: field.name,
                value: field.value,
            })),
        );
        return this;
    }

    public addField(name: string, value: string, inline?: boolean): this {
        this.addFields([{ inline: inline ?? false, name, value }]);
        return this;
    }

    public toJSON(): APIEmbed {
        return {
            author: this.author
                ? {
                      icon_url: this.author.iconURL ?? undefined,
                      name: this.author.name ?? undefined,
                      proxy_icon_url: this.author.proxyIconURL ?? undefined,
                      url: this.author.url ?? undefined,
                  }
                : undefined,
            color: this.color ?? undefined,
            description: this.description ?? undefined,
            fields:
                this.fields.map(field => ({
                    inline: field.inline ?? false,
                    name: field.name,
                    value: field.value,
                })) ?? undefined,
            footer: this.footer
                ? {
                      icon_url: this.footer.iconURL ?? undefined,
                      proxy_icon_url: this.footer.proxyIconURL ?? undefined,
                      text: this.footer.text ?? undefined,
                  }
                : undefined,
            image: this.image
                ? {
                      height: this.image.height ?? undefined,
                      proxy_url: this.image.proxyURL ?? undefined,
                      url: this.image.url ?? undefined,
                      width: this.image.width ?? undefined,
                  }
                : undefined,
            provider: this.provider
                ? {
                      name: this.provider.name ?? undefined,
                      url: this.provider.url ?? undefined,
                  }
                : undefined,
            thumbnail: this.thumbnail
                ? {
                      height: this.thumbnail.height ?? undefined,
                      proxy_url: this.thumbnail.proxyURL ?? undefined,
                      url: this.thumbnail.url ?? undefined,
                      width: this.thumbnail.width ?? undefined,
                  }
                : undefined,
            timestamp: this.timestamp?.toString() ?? undefined,
            title: this.title ?? undefined,
            url: this.url ?? undefined,
            video: this.video
                ? {
                      height: this.video.height ?? undefined,
                      proxy_url: this.video.proxyURL ?? undefined,
                      url: this.video.url ?? undefined,
                      width: this.video.width ?? undefined,
                  }
                : undefined,
        };
    }
}

export interface APIEmbedMediaData {
    url: string;
    proxyURL: string | null;
    height: string | null;
    width: string | null;
}
