import { APIEmbed } from "@guildedjs/guilded-api-typings";
import { resolveColor } from "../util/MessageUtil";

/**
 * Heavy code taken from https://github.com/discordjs/discord.js/blob/stable/src/structures/MessageEmbed.js
 * Copyright 2015 - 2021 Amish Shah
 * Copyrights licensed under the Apache License 2.0, https://github.com/discordjs/discord.js/blob/master/LICENSE
 * Taken from https://github.com/discordjs/discord.js/blob/stable/src/util/Util.js#L436
 */

export default class RichEmbed {
    footer?: {
        text: string;
        icon_url?: string;
    };
    image?: {
        url: string;
    };
    thumbnail?: {
        url: string;
    };
    author?: {
        name: string;
        icon_url?: string;
    };
    fields?: {
        inline?: boolean;
        name: string;
        value: string;
    }[];
    color?: number;
    timestamp?: number;
    description?: string;
    url?: string;
    title?: string;

    setFooter(text: string, icon_url?: string) {
        this.footer = { text, icon_url };
    }

    setImage(url: string) {
        this.image = { url };
    }

    setThumbnail(url: string) {
        this.thumbnail = { url };
    }

    setAuthor(name: string, icon_url?: string) {
        this.author = { name, icon_url };
    }

    addField(name: string, value: string, inline?: boolean) {
        this.addFields({name, value, inline});
    }

    addFields(...fields: { inline?: boolean, name: string, value: string }[]) {
        this.fields?.push(...fields);
    }

    setColor(color: string | number) {
        this.color = resolveColor(color);
    }

    setTimestamp(date: Date | number = Date.now()) {
        this.timestamp = date instanceof Date ? date.getTime() : date;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setURL(url: string) {
        this.url = url;
    }

    setTitle(title: string) {
        this.title = title;
    }

    toJSON(): APIEmbed {
        return {
            title: this.title,
            description: this.description,
            url: this.url,
            timestamp: this.timestamp ? new Date(this.timestamp).toISOString() : undefined,
            color: this.color,
            fields: this.fields,
            thumbnail: this.thumbnail,
            image: this.image,
            author: this.author ? 
                {
                    name: this.author.name,
                    icon_url: this.author.icon_url
                } 
                : undefined,
            footer: this.footer ? 
                {
                    text: this.footer.text,
                    icon_url: this.footer.icon_url,
                }
                : undefined
        };
    }
}