export interface GroupMember {
    id: string;
    name: string;
    username: string;
    avatar_url: string;
    online: boolean;
    role: "admin" | "member";
}

export interface ChatGroup {
    id: string;
    name: string;
    description: string;
    memberCount: number;
    onlineCount: number;
    members: GroupMember[];
}