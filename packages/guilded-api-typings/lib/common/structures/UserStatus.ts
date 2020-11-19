import { APIContent } from '../Content';
import { APICustomReaction } from './Reaction';

export interface APIUserStatus {
    content: APIContent | null;
    customReactionId: number | null;
    customReaction?: APICustomReaction;
}
