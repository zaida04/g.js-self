/* istanbul ignore file */

export enum IMG_EXTENSION {
    PNG = 'PNG',
    GIF = 'GIF',
}

const formHashAndSizeURL = (preURL: string, width?: number, height?: number) => {
    const url = new URL(preURL);
    if (width) url.searchParams.append('w', width.toString());
    if (height) url.searchParams.append('h', height.toString());
    return url.toString();
};

export const ROUTES = {
    AWS_CDN: 'https://s3-us-west-2.amazonaws.com/www.guilded.gg/' as const,
    BASE_DOMAIN: 'api.guilded.gg' as const,
    CDN: 'img.guildedcdn.com' as const,
    IMAGE_CDN_DOMAIN: 'img.guildedcdn.com' as const,
    MEDIA_DOMAIN: 'media.guilded.gg' as const,
    builder: (baseURL: string) => ({
        AVATAR_URL: (hash: string, size: 'Small' | 'Medium' | 'Large' = 'Medium'): string =>
            `${baseURL}/UserAvatar/${hash}-${size}.png`,
        IMAGE_IN_CHAT: (hash: string, size = 'Full', width?: number, height?: number): string =>
            formHashAndSizeURL(`${baseURL}/ContentMedia/${hash}-${size}.webp`, width, height),
        PROFILE_BANNER: (hash: string, size = 'Hero', width?: number, height?: number): string =>
            formHashAndSizeURL(`${baseURL}/UserBanner/${hash}-${size}.png`, width, height),
        TEAM_BANNER: (hash: string, size = 'Hero', width?: number, height?: number): string =>
            formHashAndSizeURL(`${baseURL}/TeamBanner/${hash}-${size}.png`, width, height),
        TEAM_EMOJI: (
            hash: string,
            size = 'Full',
            extension: 'WEBP' | 'APNG',
            width?: number,
            height?: number,
        ): string =>
            formHashAndSizeURL(`${baseURL}/CustomReaction/${hash}-${size}.${extension.toLowerCase()}`, width, height),
        TEAM_ICON: (hash: string, size: 'Small' | 'Medium' | 'Large' = 'Medium'): string =>
            `${baseURL}/TeamAvatar/${hash}-${size}.png`,
    }),
};
