// import { createContext } from "react";
import * as React from "react";
import { WebSocket } from "../../Socket";

export type SocketContext = {
  socket: WebSocket | undefined;
  host: string;
  path: string;
  isConnected: boolean;
}

const context = React.createContext<SocketContext>({
  socket: undefined
} as SocketContext);

export default context