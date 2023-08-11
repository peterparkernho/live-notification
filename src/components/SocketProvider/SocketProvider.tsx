import React, { createContext, useEffect, useMemo, useState } from "react";
import Logger from "../../Logger";
import { Socket } from "../../Socket";

export const SocketContext = createContext({})

export interface SocketProviderProps extends Pick<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  logger?: typeof console
}

const SocketProvider = ({ children, logger }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    Logger.setInstance(logger);
  }, [logger]);

  useEffect(() => {
    setSocket(new Socket());
  }, [])

  const contextValue = useMemo(() => {
    return {
      socket
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;