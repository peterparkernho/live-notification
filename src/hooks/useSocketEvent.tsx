import { useContext, useEffect, useState } from "react";
import context from "../components/SocketProvider/context";
import Logger from "../Logger";

function useSocketEvent<T>(event: string): T | undefined {
  const [data, setData] = useState<T>();
  const { socket } = useContext(context);

  useEffect(() => {
    const handler = (data: T) => {
      Logger.info(`WebSocket: ${event} `, data);
      setData(data)
    }

    if (socket) {
      socket.on(event, handler);
    }

    return () => {
      if (socket) {
        socket.off(event, handler);
      }
    }
  }, [socket, event]);

  return data;
}

export default useSocketEvent;