import type { Client } from "../structures/Client";

/**
 * Copyright 2015 - 2021 Amish Shah
 * Copyrights licensed under the Apache License 2.0, https://github.com/discordjs/discord.js/blob/master/LICENSE
 * Taken from https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js
 */
const COLORS: {[key: string]: number} = {
    DEFAULT: 0x000000,
    WHITE: 0xffffff,
    AQUA: 0x1abc9c,
    GREEN: 0x2ecc71,
    BLUE: 0x3498db,
    YELLOW: 0xffff00,
    PURPLE: 0x9b59b6,
    LUMINOUS_VIVID_PINK: 0xe91e63,
    GOLD: 0xf1c40f,
    ORANGE: 0xe67e22,
    RED: 0xe74c3c,
    GREY: 0x95a5a6,
    NAVY: 0x34495e,
    DARK_AQUA: 0x11806a,
    DARK_GREEN: 0x1f8b4c,
    DARK_BLUE: 0x206694,
    DARK_PURPLE: 0x71368a,
    DARK_VIVID_PINK: 0xad1457,
    DARK_GOLD: 0xc27c0e,
    DARK_ORANGE: 0xa84300,
    DARK_RED: 0x992d22,
    DARK_GREY: 0x979c9f,
    DARKER_GREY: 0x7f8c8d,
    LIGHT_GREY: 0xbcc0c0,
    DARK_NAVY: 0x2c3e50,
    BLURPLE: 0x7289da,
    GREYPLE: 0x99aab5,
    DARK_BUT_NOT_BLACK: 0x2c2f33,
    NOT_QUITE_BLACK: 0x23272a
}

export type IMG_SIZE = "Small" | "Medium" | "Large" | "Hero";

export const CONSTANTS = { 
    COLORS, 
    CDN: "https://img.guildedcdn.com/", 
    AWS_CDN: "https://s3-us-west-2.amazonaws.com/www.guilded.gg/",
    AVATAR_URL: (hash: string, extension: "PNG" | "GIF", size?: IMG_SIZE) => `${CONSTANTS.CDN}/UserAvatar/${hash}${size ? `-${size}` : ""}.${extension.toLowerCase()}`,
    PROFILE_BANNER: (hash: string, size?: IMG_SIZE) => `${CONSTANTS.CDN}/UserBanner/${hash}${size ? `-${size}` : ""}.png`,
    IMAGE_IN_CHAT: (hash: string, size?: IMG_SIZE) => `${CONSTANTS.CDN}/ContentMedia/${hash}${size ? `-${size}` : ""}.png`,
    TEAM_EMOJI: (hash: string, extension: "WEBP" | "APNG", size?: IMG_SIZE) => `${CONSTANTS.CDN}/CustomReaction/${hash}${size ? `-${size}` : ""}.${extension.toLowerCase()}`,
    TEAM_ICON: (hash: string, size?: IMG_SIZE) => `${CONSTANTS.CDN}/TeamAvatar/${hash}${size ? `-${size}` : ""}.png`,
    TEAM_BANNER: (hash: string, size?: IMG_SIZE) => `${CONSTANTS.CDN}/TeamBanner/${hash}${size ? `-${size}` : ""}.png`
};

export const uploadImage = (client: Client, file: FormData) => client.cdn.post<{url: string}>(`/media/upload`, { file });