import type { ReactNode } from "react";
import type { Message } from "../../types/chat";

interface Props {
    el: Message;
}

//Khung cua tin nhan tin nhan den thi se nam ben trai tin nhan gui di xe nam ben phai.
const Row = ({ el, children }: Props & { children: ReactNode }) => (
    <div className={`msg-row ${el.incoming ? "in" : "out"}`}>
        <div className={`msg ${el.incoming ? "in" : "out"}`}>{children}</div>
    </div>
);
const TextMsg = ({ el }: Props) => (
    <Row el={el}><p>{el.text}</p></Row>
);
const MediaMsg = ({ el }: Props) => (
    <Row el={el}>
        <img src={el.img} alt={el.text} className="msg-img" />
        <p>{el.text}</p>
    </Row>
);

const DocMsg = ({ el }: Props) => (
    <Row el={el}>
        <div className="msg-card doc">📄 Abstract.png</div>
        <p>{el.text}</p>
    </Row>
);

const LinkMsg = ({ el }: Props) => (
    <Row el={el}>
        <div className="msg-card">
            <img src={el.preview} alt={el.text} className="msg-img" />
            <a href="https://www.youtube.com" target="_blank">www.youtube.com</a>
        </div>
        <p>{el.text}</p>
    </Row>
);


const ReplyMsg = ({ el }: Props) => (
    <Row el={el}>
        <div className="msg-card quote">{el.text}</div>
        <p>{el.reply}</p>
    </Row>
);
const Timeline = ({ el }: Props) => (
    <div className="timeline">
        <hr /><span>{el.text}</span><hr />
    </div>
);

export { Timeline, TextMsg, MediaMsg, DocMsg, LinkMsg, ReplyMsg };