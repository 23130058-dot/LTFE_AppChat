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
