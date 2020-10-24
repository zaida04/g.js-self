import { CustomReaction } from './CustomReaction';
import { APIContent } from '../Content';

export interface UserStatus {
    content: APIContent | null;
    customReactionId: number;
    customReaction: CustomReaction;
}
