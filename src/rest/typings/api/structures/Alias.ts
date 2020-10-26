import { SocialLinkSource } from './Member';

export interface Alias {
    discriminator: null | string;
    name: string;
    gameId: number;
    socialLinkSource: SocialLinkSource | null;
    additionalInfo: unknown;
    playerInfo: null;
}
