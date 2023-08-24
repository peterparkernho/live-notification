type Option = {
    credential: boolean;
};
declare class WebSocket {
    private host;
    private path;
    private opts;
    private ws?;
    constructor(_host: string, _path: string, _opts: Option);
    get isConnected(): boolean;
    init(): void;
    disconnect(): void;
    createConnection(): void;
    addEventListener(eventName: string, handler: (...rest: any) => void): void;
    removeEventListener(eventName: string, handler: (...rest: any) => void): void;
    sendEmit(event: string | symbol, ...args: any[]): WebSocket;
}
export default WebSocket;
