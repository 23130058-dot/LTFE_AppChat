const URL = "wss://chat.longapp.io.vn/chat/chat";

let socket: WebSocket | null = null;
let manualClose = false;          // true khi ta chủ động đóng kết nối(đăng xuất)
const messageListeners = new Set<Listener>();
const openListeners = new Set<() => void>();
const pending: string[] = [];     // tin gui khi socket chua mo -> xep hang, mo xong moi gui

type Listener = (data: unknown) => void;

export function connect(): WebSocket {
    // da co ket noi (dang mo hoac dang ket noi) thi dung lai, khong tao them
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
        return socket;
    }

    manualClose = false;
    const ws = new WebSocket(URL);
    socket = ws;

    ws.onopen = () => {
        console.log("Đã kết nối");
        pending.splice(0).forEach((text) => ws.send(text));
        openListeners.forEach((fn) => fn()); // cho noi khac biet de dang nhap lai
    };

    ws.onmessage = (e) => {
        let data: unknown = e.data;
        try { data = JSON.parse(e.data); }
        catch {
            //khong phai JSON thi giu nguyen  }
        }
        messageListeners.forEach((fn) => fn(data));
    };

    ws.onerror = () => console.error("Loi ket noi toi: ", URL);

    ws.onclose = () => {
        if (socket !== ws) return; // socket cu da bi thay bang socket moi thi bo qua
        socket = null;
        if (!manualClose) setTimeout(connect, 5000); // mat mang hoac server mat ket noi thi thu lai moi 5s
    };

    return ws;
}

export function disconnect() {
    manualClose = true;
    socket?.close();
}

export function send(payload: unknown) {
    const text = JSON.stringify(payload);
    const ws = connect();
    if (ws.readyState === WebSocket.OPEN) ws.send(text);
    else pending.push(text);
}

//dang ky nhan moi tin nhan tu server, tra ve ham huy dang ky (dung trong useEffect cleanup)
export function onMessage(fn: Listener) {
    messageListeners.add(fn);
    return () => { messageListeners.delete(fn); };
}

//chay moi khi connect thanh cong
export function onOpen(fn: () => void) {
    openListeners.add(fn);
    return () => { openListeners.delete(fn); };
}