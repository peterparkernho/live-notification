import React, { useCallback, useEffect, useMemo, useState } from "react";
import Logger from "../../Logger";
import { WebSocket } from "../../Socket";
import AuthApi from "../../Api";

import { Wallet } from 'ethers';
import { ACCESS_TOKEN } from "../../Constants";

import context from './context';

export interface SocketProviderProps extends Pick<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  logger?: typeof console;
  namespace: string;
  host: string;
  path: string;
  apiEndpoint: string;
  wallet?: Wallet;
}

const SocketProvider = ({ children, logger, namespace, host, path, apiEndpoint, wallet }: SocketProviderProps) => {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    Logger.setInstance(logger);
  }, [logger]);

  const createWebSocket = useCallback(async () => {
    if (!localStorage.getItem(ACCESS_TOKEN) && wallet) {
      const api = new AuthApi(apiEndpoint);
      const res = await api.loginByWallet();
      const sign = await wallet.signMessage(res.message);
      await api.completeLoginByWallet({
        message: res.message,
        address: wallet.address,
        signature: sign,
      });
      setSocket(new WebSocket(namespace, host, path));
    } else {
      setSocket(new WebSocket(namespace, host, path));
    }
  }, [wallet, namespace, host, path]);

  useEffect(() => {
    createWebSocket();
  }, [createWebSocket])

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    }
  }, [socket])

  const contextValue = useMemo(() => {
    return {
      socket,
      namespace,
      host,
      path
    }
  }, [
    socket,
    namespace,
    host,
    path
  ]);

  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  );
};

export default SocketProvider;