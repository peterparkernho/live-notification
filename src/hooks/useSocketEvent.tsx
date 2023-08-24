import { useContext, useEffect, useState } from "react";
import context from "../components/SocketProvider/context";
import Logger from "../Logger";

function useSocketEvent<T>(event: string): T | undefined {
  const [data, setData] = useState<T>();
  const { socket, isConnected } = useContext(context);

  useEffect(() => {
    const handler = (data: T) => {
      Logger.info(`WebSocket: ${event} `, data);
      setData(data)
    }

    if (socket && isConnected) {
      Logger.info(`Subscribe WebSocket event: ${event} start`);
      socket.addEventListener(event, handler);
    } else {
      Logger.info(`Subscribe WebSocket event: ${event} waiting`);
    }

    return () => {
      if (socket) {
        Logger.info(`UnSubscribe WebSocket event: ${event}`);
        socket.removeEventListener(event, handler);
      }
    }
  }, [socket, event, isConnected]);

  return data;
}

export default useSocketEvent;