/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useEffect, useRef } from "react";
import context from "../components/SocketProvider/context";

const useSocketProvider = () => {
  const { socket } = useContext(context);
  const socketRef = useRef(socket);
  useEffect(() => {
    socketRef.current = socket;
  }, []);

  const sendEmit = useCallback((event: string | symbol, ...args: any[]) => {
    if (socketRef.current) {
      return socketRef.current.sendEmit(event, ...args);
    }
  }, []);

  return {
    sendEmit,
  };
}

export default useSocketProvider;