import { useState } from "react";
import type { ReactNode } from "react";
import {
    X,
    PencilSimple,
    Bell,
    BellSlash,
    PushPin,
    CaretDown,
    Image,
    FileText,
    Link,
    Warning,
    Trash,
} from "phosphor-react";
import type { Chat } from "../../types/chat";
import "../../styles/conversation-info.scss";

interface Props {
    chat: Chat;
    onClose: () => void;
    onTogglePin: () => void;
    onToggleMute: () => void;
    onDelete: () => void;
}

//nut tron co nhan ben duoi (Biet danh, Tat thong bao, Ghim)
interface ActionProps {
    icon: ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const QuickAction = ({ icon, label, active, onClick }: ActionProps) => (
    <button className={`info-action ${active ? "active" : ""}`} onClick={onClick}>
        <span className="info-action-icon">{icon}</span>
        <span className="info-action-label">{label}</span>
    </button>
);

//muc co the thu gon: Anh/Video, File, Link. Hien tai chi de khung, chua co du lieu that.
interface SectionProps {
    icon: ReactNode;
    title: string;
    emptyText: string;
}

const InfoSection = ({ icon, title, emptyText }: SectionProps) => {
    const [open, setOpen] = useState(true);

    return (
        <section className="info-section">
            <button className="info-section-head" onClick={() => setOpen(!open)} aria-expanded={open}>
                <span className="info-section-icon">{icon}</span>
                <span className="info-section-title">{title}</span>
                <CaretDown className={`info-section-caret ${open ? "open" : ""}`} />
            </button>

            {open && <p className="info-section-empty">{emptyText}</p>}
        </section>
    );
};

//bang thong tin hoi thoai (ben phai khung chat) - hien tai cho hoi thoai ca nhan
const ConversationInfo = ({ chat, onClose, onTogglePin, onToggleMute, onDelete }: Props) => {
    const handleDelete = () => {
        if (window.confirm(`Xóa cuộc trò chuyện với ${chat.name}? Hành động này không thể hoàn tác.`)) {
            onDelete();
        }
    };

    return (
        <aside className="info-panel">
            <header className="info-header">
                <h3>Thông tin hội thoại</h3>
                <button className="icon-btn" onClick={onClose} title="Đóng" aria-label="Đóng">
                    <X />
                </button>
            </header>

            <div className="info-scroll">
                {/* avatar + ten */}
                <div className="info-profile">
                    <div className="info-avatar">
                        <img src={chat.avatar_url} alt={chat.name} />
                        {chat.online && <span className="status-online" />}
                    </div>
                    <div className="info-name">{chat.name}</div>
                    <div className="info-status">{chat.online ? "Online" : "Offline"}</div>
                </div>

                {/* cac nut nhanh */}
                <div className="info-actions">
                    <QuickAction icon={<PencilSimple size={20} />} label="Biệt danh" />
                    <QuickAction
                        icon={chat.muted ? <BellSlash size={20} weight="fill" /> : <Bell size={20} />}
                        label={chat.muted ? "Bật thông báo" : "Tắt thông báo"}
                        active={chat.muted}
                        onClick={onToggleMute}
                    />
                    <QuickAction
                        icon={<PushPin size={20} weight={chat.pinned ? "fill" : "regular"} />}
                        label={chat.pinned ? "Bỏ ghim" : "Ghim trò chuyện"}
                        active={chat.pinned}
                        onClick={onTogglePin}
                    />
                </div>

                <div className="info-divider" />

                {/* anh/video, file, link (chua co du lieu that) */}
                <InfoSection icon={<Image size={20} />} title="Ảnh/Video" emptyText="Chưa có ảnh/video nào được chia sẻ" />
                <InfoSection icon={<FileText size={20} />} title="File" emptyText="Chưa có file nào được chia sẻ" />
                <InfoSection icon={<Link size={20} />} title="Link" emptyText="Chưa có link nào được chia sẻ" />

                <div className="info-divider" />

                {/* bao cao + xoa */}
                <div className="info-list">
                    <button className="info-row">
                        <Warning size={20} />
                        <span>Báo cáo</span>
                    </button>
                    <button className="info-row danger" onClick={handleDelete}>
                        <Trash size={20} />
                        <span>Xóa cuộc trò chuyện</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};
export default ConversationInfo;
