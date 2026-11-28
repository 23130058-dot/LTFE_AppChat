import type { ChatGroup } from "../types/group";

export const groups: ChatGroup[] = [
    {
        id: "g1",
        name: "Nhóm dự án",
        description: "Nhóm trao đổi về bài tập và tiến độ dự án.",
        memberCount: 3,
        onlineCount: 2,
        members: [
            {
                id: "u1",
                name: "Minh Nguyễn",
                username: "minhnguyen",
                avatar_url: "https://i.pravatar.cc/100?img=1",
                online: true,
                role: "admin",
            },
            {
                id: "u2",
                name: "Lan Trần",
                username: "lantran",
                avatar_url: "https://i.pravatar.cc/100?img=5",
                online: false,
                role: "member",
            },
            {
                id: "u3",
                name: "Huy Lê",
                username: "huyle",
                avatar_url: "https://i.pravatar.cc/100?img=8",
                online: true,
                role: "member",
            },
        ],
    },
    {
        id: "g2",
        name: "Lớp học",
        description: "Nhóm thông báo và trao đổi trong lớp.",
        memberCount: 2,
        onlineCount: 1,
        members: [
            {
                id: "u1",
                name: "Minh Nguyễn",
                username: "minhnguyen",
                avatar_url: "https://i.pravatar.cc/100?img=1",
                online: true,
                role: "admin",
            },
            {
                id: "u4",
                name: "Mai Phạm",
                username: "maipham",
                avatar_url: "https://i.pravatar.cc/100?img=9",
                online: false,
                role: "member",
            },
        ],
    },
];