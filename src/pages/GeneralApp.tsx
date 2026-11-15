import { useState } from "react";
import { chats as initialChats } from "../data/chatdata";
import type { Chat } from "../types/chat";
import ChatList from "../components/ChatList";
import Conversation from "../components/Conversation";
import ConversationInfo from "../components/Conversation/ConversationInfo.tsx"
import "../styles/general-app.scss";

// Trang chat chinh cua app tro chuyen chat app.

const GeneralApp = () => {
    const [chats, setChats] = useState<Chat[]>(initialChats);
    const [activeId, setActiveId] = useState(initialChats[0].id);
    const [showInfo, setShowInfo] = useState(false); //bang thong tin hoi thoai

    // co the la undefined neu da xoa het cuoc tro chuyen
    const active = chats.find((c) => c.id === activeId);

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

    //ghim / bo ghim chat dang chon
    const ghimChat = () => {
        setChats(chats.map((c) => (c.id === activeId ? { ...c, pinned: !c.pinned } : c)));
    };

    //tat / bat thong bao chat dang chon
    const tatThongBao = () => {
        setChats(chats.map((c) => (c.id === activeId ? { ...c, muted: !c.muted } : c)));
    };

    //xoa chat dang chon, chuyen sang chat dau tien con lai
    const xoaChat = () => {
        const conLai = chats.filter((c) => c.id !== activeId);
        setChats(conLai);
        setActiveId(conLai[0]?.id ?? "");
        setShowInfo(false);
    };

    return (
        <div className="general-app">
            <ChatList chats={chats} activeId={activeId} onSelect={chonChat} />

            <div className="conversation-wrap">
                {active ? (
                    <Conversation
                        chat={active}
                        onSend={guiTin}
                        onToggleInfo={() => setShowInfo(!showInfo)}
                        infoOpen={showInfo}
                    />
                ) : (
                    <div className="conversation-empty">Chọn một cuộc trò chuyện để bắt đầu</div>
                )}
            </div>

            {active && showInfo && (
                <ConversationInfo
                    chat={active}
                    onClose={() => setShowInfo(false)}
                    onTogglePin={ghimChat}
                    onToggleMute={tatThongBao}
                    onDelete={xoaChat}
                />
            )}
        </div>
    );
};

export default GeneralApp;
