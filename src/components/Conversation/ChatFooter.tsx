import { useState } from "react";
import { PaperPlaneTilt } from "phosphor-react";

interface Props {
    onSend: (text: string) => void;
}
//footer cua phan giao dien app tro chuyen

const ChatFooter = ({ onSend }: Props) => {
    const [text, setText] = useState("");

    const gui = () => {
        if (text.trim() === "") return;
        onSend(text);
        setText("");
    };

    return (
        <footer className="chat-footer">
            <input
                className="chat-input"
                placeholder="Nhap tin nhan..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && gui()}
            />
            <button className="send-btn" onClick={gui}>
                <PaperPlaneTilt color="#fff" size={22} />
            </button>
        </footer>
    );
};
export default ChatFooter;