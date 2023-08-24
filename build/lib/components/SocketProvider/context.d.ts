import * as React from "react";
import { WebSocket } from "../../Socket";
export type SocketContext = {
    socket: WebSocket | undefined;
    host: string;
    path: string;
    isConnected: boolean;
};
declare const context: React.Context<SocketContext>;
export default context;
