export type IMG_SIZE = 'Small' | 'Medium' | 'Large' | 'Hero';

export const CONSTANTS = {
    AVATAR_URL: (hash: string, extension: 'PNG' | 'GIF', size?: IMG_SIZE): string =>
        `${CONSTANTS.CDN}/UserAvatar/${hash}${size ? `-${size}` : ''}.${extension.toLowerCase()}`,
    AWS_CDN: 'https://s3-us-west-2.amazonaws.com/www.guilded.gg/' as const,
    BASE_DOMAIN: 'api.guilded.gg' as const,
    CDN: 'img.guildedcdn.com' as const,
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
