import { useState } from "react";
import { chats as initialChats } from "../data/chatdata";
import type { Chat } from "../types/chat";
import ChatList from "../components/ChatList";
import Conversation from "../components/Conversation";
import "../styles/general-app.scss";

// Trang chat chinh cua app tro chuyen chat app.

const GeneralApp = () => {
    const [chats, setChats] = useState<Chat[]>(initialChats);
    const [activeId, setActiveId] = useState(initialChats[0].id);

    const active = chats.find((c) => c.id === activeId)!;
    //chon chat thi xoa so tin chua doc
    const chonChat = (id: string) => {
        setActiveId(id);
        setChats(chats.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
    };

    //gui tin vao chat dang chon
    const guiTin = (text: string) => {
        const time = new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
        const tinMoi = { id: Date.now().toString(), text, incoming: false, time };

        setChats(chats.map((c) =>
            c.id === activeId
                ? { ...c, last_message: text, time, messages: [...c.messages, tinMoi] }
                : c
        ));
    };

    return (
        <div className="general-app">
            <ChatList chats={chats} activeId={activeId} onSelect={chonChat} />
            <div className="conversation-wrap">
                <Conversation chat={active} onSend={guiTin} />
            </div>
        </div>
    );
};

export default GeneralApp;