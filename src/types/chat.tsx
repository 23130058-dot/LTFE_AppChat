export type MsgSubtype = "text" | "img" | "doc" | "link" | "reply" | "divider";

export interface Message{
    id: string;
    text: string;
    incoming: boolean;
    time: string;
    subtype?: MsgSubtype;
    img?: string;
    preview?: string;
    reply?: string;
}
export interface Chat{
    id: string;
    name: string;
    avatar_url: string;
    last_message: string;
    time: string;
    unread: number;
    online: boolean;
    pinned?: boolean;
    messages: Message[];
}