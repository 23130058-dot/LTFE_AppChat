import type { Chat } from "../types/chat";

//test data.

export const chats: Chat[] = [
    {
        id: "1", name: "Minh", avatar_url: "https://i.pravatar.cc/100?img=1", last_message: "Toi nay di cafe khong?",
        time: "9:36", unread: 2, online: true, pinned: true,
        messages: [
            { id: "m0", text: "Hom nay", incoming: true, time: "", subtype: "divider" },
            { id: "m1", text: "Hi, khoe khong?", incoming: true, time: "09:28" },
            { id: "m2", text: "On, con ban?", incoming: false, time: "09:29" },
            { id: "m3", text: "Xem cai nay nha", incoming: true, time: "09:30", subtype: "img", img: "https://picsum.photos/seed/chat1/300/200" },
            { id: "m4", text: "Toi nay di cafe khong?", incoming: true, time: "09:36" },
        ],
    },
    {
        id: "2", name: "Lan", avatar_url: "https://i.pravatar.cc/100?img=5", last_message: "Ok da nhan",
        time: "Hom qua", unread: 0, online: false, pinned: true,
        messages: [
            { id: "m1", text: "Gui file roi nha", incoming: false, time: "20:10" },
            { id: "m2", text: "Ok da nhan", incoming: true, time: "20:12" },
        ],
    },
    {
        id: "3", name: "Huy", avatar_url: "https://i.pravatar.cc/100?img=8", last_message: "Mai di hoc khong?",
        time: "10:35", unread: 3, online: true,
        messages: [{ id: "m1", text: "Mai di hoc khong?", incoming: true, time: "10:35" }],
    },
    {
        id: "4", name: "Nhom 10", avatar_url: "https://i.pravatar.cc/100?img=15", last_message: "Ai lam phan UI?",
        time: "08:42", unread: 5, online: true,
        messages: [{ id: "m1", text: "Ai lam phan UI?", incoming: true, time: "08:42" }],
    },
];