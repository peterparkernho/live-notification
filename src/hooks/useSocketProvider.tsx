/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import context from "../components/SocketProvider/context";

const useSocketProvider = () => {
  const { socket, isConnected } = React.useContext(context);

  const socketRef = React.useRef(socket);

  React.useEffect(() => {
    socketRef.current = socket;
  }, []);

  const sendEmit = React.useCallback((event: string | symbol, ...args: any[]) => {
    if (socketRef.current) {
      return socketRef.current.sendEmit(event, ...args);
    }
  }, []);

  return {
    socket,
    isConnected,
    sendEmit,
  };
}

export default useSocketProvider;