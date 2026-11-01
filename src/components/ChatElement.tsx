import type { Chat } from "../types/chat";

interface Props {
    chat: Chat;
    active: boolean;
    onClick: () => void;
}

//moi dong trong danh sach hoi thoai, friend hay group la 1 chatElement.
const ChatElement = ({ chat, active, onClick }: Props) => (
    <div className={`chat-item ${active ? "active" : ""}`} onClick={onClick}>
        <div className="avatar-wrap">
            <img src={chat.avatar_url} alt={chat.name} className="avatar" />
            {chat.online && <span className="status-online" />}
        </div>
        <div className="chat-info">
            <div className="chat-name">{chat.name}</div>
            <div className="chat-last">{chat.last_message}</div>

        </div>
        <div className="chat-meta">
            <span className="chat-time">{chat.time}</span>
            {chat.unread > 0 && <span className="badge-unread">{chat.unread}</span>}
        </div>
    </div>
);
export default ChatElement;