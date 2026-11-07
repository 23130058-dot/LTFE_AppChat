import { useEffect, useRef } from "react";
import type { Chat } from "../../types/chat";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import { Timeline, TextMsg, MediaMsg, DocMsg, LinkMsg, ReplyMsg } from "./MsgTypes";

interface Props {
    chat: Chat;
    onSend: (text: string) => void;
    onToggleInfo?: () => void;
}
//khung chat o giua

const Conversation = ({ chat, onSend, onToggleInfo }: Props) => {
    const endRef = useRef<HTMLDivElement>(null);
    //co tin moi hoac doi chat thi cuon xuong cuoi
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat.id, chat.messages.length]);

    return (
        <div className="conversation">
            <ChatHeader chat={chat} onToggleInfo={onToggleInfo} />

            <div className="conversation-body">
                <div className="messages">
                    {chat.messages.map((m) => {
                        if (m.subtype === "divider") return <Timeline key={m.id} el={m} />;
                        if (m.subtype === "img") return <MediaMsg key={m.id} el={m} />;
                        if (m.subtype === "doc") return <DocMsg key={m.id} el={m} />;
                        if (m.subtype === "link") return <LinkMsg key={m.id} el={m} />;
                        if (m.subtype === "reply") return <ReplyMsg key={m.id} el={m} />;
                        return <TextMsg key={m.id} el={m} />;
                    })}
                </div>
                <div ref={endRef} />
            </div>
            <ChatFooter onSend={onSend} />
        </div>

    );
};
export default Conversation;