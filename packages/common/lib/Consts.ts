/**
 * Copyright 2015 - 2021 Amish Shah
 * Copyrights licensed under the Apache License 2.0, https://github.com/discordjs/discord.js/blob/master/LICENSE
 * Taken from https://github.com/discordjs/discord.js/blob/stable/src/util/Constants.js
 */
const COLORS: { [key: string]: number } = {
    AQUA: 0x1abc9c,
    BLUE: 0x3498db,
    BLURPLE: 0x7289da,
    DARKER_GREY: 0x7f8c8d,
    DARK_AQUA: 0x11806a,
    DARK_BLUE: 0x206694,
    DARK_BUT_NOT_BLACK: 0x2c2f33,
    DARK_GOLD: 0xc27c0e,
    DARK_GREEN: 0x1f8b4c,
    DARK_GREY: 0x979c9f,
    DARK_NAVY: 0x2c3e50,
    DARK_ORANGE: 0xa84300,
    DARK_PURPLE: 0x71368a,
    DARK_RED: 0x992d22,
    DARK_VIVID_PINK: 0xad1457,
    DEFAULT: 0x000000,
    GOLD: 0xf1c40f,
    GREEN: 0x2ecc71,
    GREY: 0x95a5a6,
    GREYPLE: 0x99aab5,
    LIGHT_GREY: 0xbcc0c0,
    LUMINOUS_VIVID_PINK: 0xe91e63,
    NAVY: 0x34495e,
    NOT_QUITE_BLACK: 0x23272a,
    ORANGE: 0xe67e22,
    PURPLE: 0x9b59b6,
    RED: 0xe74c3c,
    WHITE: 0xffffff,
    YELLOW: 0xffff00,
};

export type IMG_SIZE = 'Small' | 'Medium' | 'Large' | 'Hero';

export const CONSTANTS = {
    AVATAR_URL: (hash: string, extension: 'PNG' | 'GIF', size?: IMG_SIZE): string =>
        `${CONSTANTS.CDN}/UserAvatar/${hash}${size ? `-${size}` : ''}.${extension.toLowerCase()}`,
    AWS_CDN: 'https://s3-us-west-2.amazonaws.com/www.guilded.gg/' as const,
    BASE_DOMAIN: 'api.guilded.gg' as const,
    CDN: 'img.guildedcdn.com' as const,
    COLORS,
    IMAGE_IN_CHAT: (hash: string, size?: IMG_SIZE): string =>
        `${CONSTANTS.CDN}/ContentMedia/${hash}${size ? `-${size}` : ''}.png`,
    MEDIA_DOMAIN: 'media.guilded.gg' as const,
    PROFILE_BANNER: (hash: string, size?: IMG_SIZE): string =>
        `${CONSTANTS.CDN}/UserBanner/${hash}${size ? `-${size}` : ''}.png`,
    TEAM_BANNER: (hash: string, size?: IMG_SIZE): string =>
        `${CONSTANTS.CDN}/TeamBanner/${hash}${size ? `-${size}` : ''}.png`,
    TEAM_EMOJI: (hash: string, extension: 'WEBP' | 'APNG', size?: IMG_SIZE): string =>
        `${CONSTANTS.CDN}/CustomReaction/${hash}${size ? `-${size}` : ''}.${extension.toLowerCase()}`,
    TEAM_ICON: (hash: string, size?: IMG_SIZE): string =>
        `${CONSTANTS.CDN}/TeamAvatar/${hash}${size ? `-${size}` : ''}.png`,
};
