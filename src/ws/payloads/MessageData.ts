export interface MessageData {
    id: string;
    createdBy: string;
    content: {
        object: string;
        document: {
            object: string;
            nodes: {
                object: string;
                type: 'paragraph' | 'block-quote-container' | 'markdown-plain-text' | 'webhookMessage';
                nodes: {
                    object: 'text' | 'inline';
                    leaves: {
                        object: string;
                        text: string;
                        marks: string[];
                    }[];
                }[];
            }[];
        };
    };
    type: string;
    createdAt: string;
}
