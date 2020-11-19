import { SocialLinkSource } from './Member';

export interface APIAlias {
    alias?: string;
    discriminator: null | string;
    name: string;
    createdAt?: string;
    userId?: string;
    gameId: number;
    socialLinkSource: SocialLinkSource | null;
    additionalInfo: unknown;
    editedAt?: string;
    playerInfo: unknown;
}
