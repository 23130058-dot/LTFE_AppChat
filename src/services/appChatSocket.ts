const SOCKET_URL = import.meta.env.VITE_CHAT_WS_URL || 'wss://chat.longapp.io.vn/chat/chat';

type SocketListener = (data: unknown) => void;
type SocketResponse = {
    status?: string;
    event?: string;
    data?: unknown;
    mes?: string;
    message?: string;
    error?: string;
};

export type AuthEvent = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD' | 'RESET_PASSWORD';

let socket: WebSocket | null = null;
let manualClose = false;
let authQueue: Promise<unknown> = Promise.resolve();

const messageListeners = new Set<SocketListener>();
const openListeners = new Set<() => void>();
const pendingMessages: string[] = [];

/** Tạo hoặc lấy kết nối WebSocket dùng chung của ứng dụng. */
export function connect(): WebSocket {
    if (
        socket &&
        (socket.readyState === WebSocket.OPEN ||
            socket.readyState === WebSocket.CONNECTING)
    ) {
        return socket;
    }

    manualClose = false;
    const currentSocket = new WebSocket(SOCKET_URL);
    socket = currentSocket;

    currentSocket.onopen = () => {
        console.log('Đã kết nối AppChatSocket');

        while (pendingMessages.length > 0 && currentSocket.readyState === WebSocket.OPEN) {
            currentSocket.send(pendingMessages.shift()!);
        }

        openListeners.forEach((listener) => listener());
    };

    currentSocket.onmessage = (message) => {
        let data: unknown = message.data;

        try {
            data = JSON.parse(String(message.data));
        } catch {
            // Giữ nguyên dữ liệu nếu máy chủ không gửi JSON.
        }

        messageListeners.forEach((listener) => listener(data));
    };

    currentSocket.onerror = () => {
        console.error('Lỗi kết nối WebSocket:', SOCKET_URL);
    };

    currentSocket.onclose = () => {
        if (socket !== currentSocket) return;

        socket = null;
        if (!manualClose) {
            window.setTimeout(() => connect(), 5000);
        }
    };

    return currentSocket;
}

/** Đóng kết nối khi người dùng chủ động đăng xuất hoặc rời ứng dụng. */
export function disconnect(): void {
    manualClose = true;
    socket?.close();
    socket = null;
}

/** Gửi dữ liệu thông thường qua kết nối WebSocket dùng chung. */
export function send(payload: unknown): void {
    const message = JSON.stringify(payload);
    const currentSocket = connect();

    if (currentSocket.readyState === WebSocket.OPEN) {
        currentSocket.send(message);
    } else {
        pendingMessages.push(message);
    }
}

/** Đăng ký nhận dữ liệu từ máy chủ. Trả về hàm hủy đăng ký. */
export function onMessage(listener: SocketListener): () => void {
    messageListeners.add(listener);
    return () => messageListeners.delete(listener);
}

/** Đăng ký sự kiện khi WebSocket kết nối thành công. */
export function onOpen(listener: () => void): () => void {
    openListeners.add(listener);
    return () => openListeners.delete(listener);
}

function getResponseMessage(response: SocketResponse, event: AuthEvent): string {
    return (
        response.mes ||
        response.message ||
        response.error ||
        `${event} thất bại. Vui lòng thử lại.`
    );
}


function sendAuthRequest(
    event: AuthEvent,
    data: Record<string, unknown>,
): Promise<SocketResponse> {
    return new Promise((resolve, reject) => {
        const currentSocket = connect();
        let completed = false;

        let unsubscribeMessage = () => {};
        let unsubscribeOpen = () => {};

        const timeoutId = window.setTimeout(() => {
            finish(() => reject(
                new Error('Máy chủ không phản hồi. Vui lòng thử lại.')
            ));
        }, 15000);

        function cleanup() {
            window.clearTimeout(timeoutId);
            unsubscribeMessage();
            unsubscribeOpen();
        }

        function finish(callback: () => void) {
            if (completed) return;
            completed = true;
            cleanup();
            callback();
        }


        function handleMessage(message: unknown) {
            console.log('[AppChatSocket] Received:', message);

            if (!message || typeof message !== 'object') return;

            const raw = message as SocketResponse;

            // Đọc status và event ở cấp ngoài cùng.
            const status = raw.status?.toLowerCase();
            const responseEvent = raw.event;

            if (responseEvent && responseEvent !== event) return;

            if (!status) {
                console.warn('Phản hồi không có status hợp lệ:', message);
                return;
            }

            if (status === 'success') {
                finish(() => resolve(raw));
                return;
            }

            if (['error', 'failed', 'failure'].includes(status)) {
                finish(() => reject(
                    new Error(getResponseMessage(raw, event))
                ));
            }
        }


        function sendRequest() {
            if (completed) return;

            if (currentSocket.readyState !== WebSocket.OPEN) {
                finish(() => reject(
                    new Error('WebSocket chưa kết nối.')
                ));
                return;
            }

            const payload = {
                action: 'onchat',
                data: {
                    event,
                    data,
                },
            };

            console.log('[AppChatSocket] Sending:', payload);

            currentSocket.send(JSON.stringify(payload));
        }

        unsubscribeMessage = onMessage(handleMessage);
        unsubscribeOpen = onOpen(sendRequest);

        if (currentSocket.readyState === WebSocket.OPEN) {
            sendRequest();
        }
    });
}

/**
 * Gửi sự kiện xác thực qua AppChatSocket.
 * Các yêu cầu xác thực được xếp hàng để tránh ghép nhầm phản hồi.
 */
export function requestAuth(
    event: AuthEvent,
    data: Record<string, unknown>,
): Promise<SocketResponse> {
    const request = authQueue.then(() => sendAuthRequest(event, data));
    authQueue = request.catch(() => undefined);
    return request;
}
