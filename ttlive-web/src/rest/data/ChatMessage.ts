export interface ChatMessage {
    id: number;
    username: string;
    text: string;
    createdAt: string;
    editor: boolean;
}

export interface RequestChatMessage {
    username: string;
    text: string;
    editor: boolean;
}

export interface LiveCount{
    count: number;
}

export function sortChatMessages(messages: Array<ChatMessage>) {
    return messages.sort((a, b) => a.createdAt === b.createdAt ? 0 : a.createdAt > b.createdAt ? 1 : -1);
}