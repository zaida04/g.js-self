import { APIContent } from '../Content';
import { CustomReaction } from './Reaction';

export interface UserStatus {
    content: APIContent | null;
    customReactionId: number | null;
    customReaction?: CustomReaction;
}
