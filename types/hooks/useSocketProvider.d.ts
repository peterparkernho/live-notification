declare const useSocketProvider: () => {
    socket: import("../Socket/WebSocket").default | undefined;
    isConnected: boolean;
    sendEmit: (event: string | symbol, ...args: any[]) => import("../Socket/WebSocket").default | undefined;
};
export default useSocketProvider;
