import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import type { Chat } from "../../types/chat";

interface Props {
    chat: Chat;
    onToggleInfo?: () => void;
}
//header cua khung chat chua cac thong tin nhu avt icon goi dien ,...

const ChatHeader = ({ chat, onToggleInfo }: Props) => (
    <header className="chat-header">
        <div className="chat-header-user" onClick={onToggleInfo}>
            <div className="avatar-wrap">
                <img src={chat.avatar_url} alt={chat.name} className="avatar" />
                {chat.online && <span className="status-online" />}
            </div>
            <div>
                <div className="chat-name">{chat.name}</div>
                <div className="chat-status">{chat.online ? "Online" : "Offline"}</div>
            </div>
        </div>
        <div className="chat-header-actions">
            <button className="icon-btn"><VideoCamera /></button>
            <button className="icon-btn"><Phone /></button>
            <button className="icon-btn"><MagnifyingGlass /></button>
            <span className="vline" />
            <button className="icon-btn"><CaretDown /></button>
        </div>
    </header>
);
export default ChatHeader;