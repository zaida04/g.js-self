import { APIEmoji } from '../common/structures/Emoji';

/**
 * Get Team Emojis
 * @destination
 */
export interface APIGetTeamEmojisResult {
    emojis: APIEmoji[];
}

/**
 * Get Team Emojis
 * @destination
 */
export interface APIGetTeamEmojisQuery {
    maxItems: number;
    when: {
        upperValue: string;
        lowerValue: string;
    };
    createdBy: string;
    searchTerm: string;
    beforeId: string;
}

/**
 * Create Team Emoji
 * @destination
 */
export interface APIPostTeamEmojisBody {
    name: string;
    png?: string;
    webp?: string;
    apng?: string;
}

/**
 * Create Team Emoji
 * @destination
 */
export type APIPostTeamEmojisResult = APIEmoji;

/**
 * Modify Team Emoji
 * @destination
 */
export interface APIPatchTeamEmojiBody {
    name: string;
}

/**
 * Modify Team Emoji
 * @destination
 */
export type APIPatchTeamEmojisResult = never;

/**
 * Delete Team Emoji
 * @destination
 */
export type APIDeleteTeamEmojiResult = never;

/**
 * Get Team Emoji Creators
 * @destination
 */
export interface APIGetTeamEmojisResult {}
