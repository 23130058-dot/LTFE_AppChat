import { useState } from "react";
import { MagnifyingGlass } from "phosphor-react";
import type { Chat } from "../types/chat";
import ChatElement from "./ChatElement";

interface Props {
    chats: Chat[];
    activeId: string;
    onSelect: (id: string) => void;
}

//danh sach hien thi cac chatElement, moi chat element co the la friend hay la group nam trong list.

const ChatList = ({ chats, activeId, onSelect }: Props) => {
    const [keyword, setKeyword] = useState("");

    //loc theo ten
    const list = chats.filter((c) => c.name.toLowerCase().includes(keyword.toLowerCase()));
    return (
        <aside className="chat-list">
            <h2 className="chat-list-title">Chats</h2>

            <div className="search">
                <MagnifyingGlass color="#FF7A00" />
                <input placeholder="Tim kiem..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            </div>

            <div className="chat-scroll">
                <div className="chat-group">
                    <span className="group-title">Pinned</span>
                    {list.filter((c) => c.pinned).map((c) => (
                        <ChatElement key={c.id} chat={c} active={c.id === activeId} onClick={() => onSelect(c.id)} />
                    ))}
                </div>
                <div className="chat-group">
                    <span className="group-title">All Chats</span>
                    {list.filter((c) => !c.pinned).map((c) => (
                        <ChatElement key={c.id} chat={c} active={c.id === activeId} onClick={() => onSelect(c.id)} />
                    ))}

                </div>
            </div>
        </aside>
    );
};
export default ChatList;