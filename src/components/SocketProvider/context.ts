import { createContext } from "react";
import { WebSocket } from "../../Socket";

export type SocketContext = {
  socket: WebSocket | undefined;
  namespace: string;
  host: string;
  path: string;
}

const context =  createContext<SocketContext>({
  socket: undefined
} as SocketContext);

export default context