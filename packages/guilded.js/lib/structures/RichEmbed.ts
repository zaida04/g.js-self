/* eslint-disable @typescript-eslint/naming-convention */
import type { APIEmbed } from '@guildedjs/guilded-api-typings';

import { resolveColor } from '../util/MessageUtil';

/**
 * Heavy code taken from https://github.com/discordjs/discord.js/blob/stable/src/structures/MessageEmbed.js
 * Copyright 2015 - 2021 Amish Shah
 * Copyrights licensed under the Apache License 2.0, https://github.com/discordjs/discord.js/blob/master/LICENSE
 * Taken from https://github.com/discordjs/discord.js/blob/stable/src/util/Util.js#L436
 */

/**
 * Guilded RichEmbeds are identical to Discord RicEmbeds.
 */
export class RichEmbed {
    public data: APIEmbed = {};

    public constructor(data?: APIEmbed) {
        if (data) this.data = data;
    }

    public setFooter(text: string, icon_url?: string): this {
        this.data.footer = { icon_url, text };
        return this;
    }

    public setImage(url: string): this {
        this.data.image = { url };
        return this;
    }

    public setThumbnail(url: string): this {
        this.data.thumbnail = { url };
        return this;
    }

    public setAuthor(name: string, icon_url?: string): this {
        this.data.author = { icon_url, name };
        return this;
    }

    public addField(name: string, value: string, inline?: boolean): this {
        this.addFields({ inline, name, value });
        return this;
    }

    public addFields(...fields: { inline?: boolean; name: string; value: string }[]): this {
        if (!this.data.fields) {
            this.data.fields = [];
        }
        this.data.fields?.push(...fields);
        return this;
    }

    public setColor(color: string | number | [number, number, number]): this {
        this.data.color = resolveColor(color);
        return this;
    }

    public setTimestamp(date: Date = new Date()): this {
        this.data.timestamp = date.toISOString();
        return this;
    }

    public setDescription(description: string): this {
        this.data.description = description;
        return this;
    }

    public setURL(url: string): this {
        this.data.url = url;
        return this;
    }

    public setTitle(title: string): this {
        this.data.title = title;
        return this;
    }

    public toJSON(): APIEmbed {
        return {
            author: this.data.author
                ? {
                      icon_url: this.data.author.icon_url,
                      name: this.data.author.name,
                  }
                : undefined,
            color: this.data.color,
            description: this.data.description,
            fields: this.data.fields,
            footer: this.data.footer
                ? {
                      icon_url: this.data.footer.icon_url,
                      text: this.data.footer.text,
                  }
                : undefined,
            image: this.data.image,
            thumbnail: this.data.thumbnail,
            timestamp: this.data.timestamp?.toString(),
            title: this.data.title,
            url: this.data.url,
        };
    }
}
