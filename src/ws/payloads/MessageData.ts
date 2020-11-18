import { APIContent } from '../../common';

export interface MessageData {
    id: string;
    createdBy: string;
    content: APIContent;
    type: string;
    createdAt: string;
}
