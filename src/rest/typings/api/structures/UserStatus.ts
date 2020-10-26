import { APIContent } from '../Content';
import { CustomReaction } from './CustomReaction';

export interface UserStatus {
    content: APIContent | null;
    customReactionId: number | null;
    customReaction?: CustomReaction;
}
