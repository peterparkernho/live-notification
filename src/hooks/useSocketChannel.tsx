import { useContext, useEffect, useState } from "react";
import context from "../components/SocketProvider/context";
import Logger from "../Logger";

function useSocketChannel<T>(channel: string): T | undefined {
  const [data, setData] = useState<T>();
  const { socket } = useContext(context);

  useEffect(() => {
    const handler = (data: T) => {
      Logger.info(`WebSocket: ${channel} `, data);
      setData(data)
    }

    if (socket) {
      socket.on(channel, handler);
    }

    return () => {
      if (socket) {
        socket.off(channel, handler);
      }
    }
  }, [socket, channel]);

  return data;
}

export default useSocketChannel;