declare const useSocketProvider: () => {
    socket: import("../Socket/WebSocket").default | undefined;
    isConnected: boolean;
    sendEmit: (event: string | symbol, ...args: any[]) => any;
};
export default useSocketProvider;
