import * as React from 'react';
import Logger from "../../Logger";
import { WebSocket } from "../../Socket";
import AuthApi from "../../Api";

import { Wallet } from 'ethers';
import { ACCESS_TOKEN } from "../../Constants";

import context from './context';
import { BASE_CHANNEL_ENUM } from "../../Socket/constants";

export interface SocketProviderProps extends Pick<React.ComponentPropsWithoutRef<'div'>, 'children'> {
  logger?: typeof console;
  host: string;
  path: string;
  apiEndpoint?: string;
  wallet?: Wallet;
}

const SocketProvider = ({ children, logger, host, path, apiEndpoint, wallet }: SocketProviderProps) => {
  const [socket, setSocket] = React.useState<WebSocket>();
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    Logger.setInstance(logger);
  }, [logger]);

  const createWebSocket = React.useCallback(async () => {
    let _socket: WebSocket;
    if (apiEndpoint) {
      if (!localStorage.getItem(ACCESS_TOKEN) && wallet) {
        const api = new AuthApi(apiEndpoint);
        const res = await api.loginByWallet();
        const sign = await wallet.signMessage(res.message);
        await api.completeLoginByWallet({
          message: res.message,
          address: wallet.address,
          signature: sign,
        });
        _socket = new WebSocket(host, path, {
          credential: true,
        });
      } else {
        _socket = new WebSocket(host, path, {
          credential: false,
        });
      }
    } else {
      _socket = new WebSocket(host, path, {
        credential: false,
      });
    }

    setSocket(_socket);

    if (_socket) {
      Logger.info(`WebSocket: listen base events`);
      _socket.addEventListener(BASE_CHANNEL_ENUM.CONNECT, ((data: unknown) => {
        setIsConnected(_socket.isConnected);
        Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.CONNECT, _socket.isConnected, data);
      }));
  
      _socket.addEventListener(BASE_CHANNEL_ENUM.RECONNECT, (data: unknown) => {
        setIsConnected(_socket.isConnected);
        Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.RECONNECT, _socket.isConnected, data);
      });
  
      _socket.addEventListener(BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT, (data: unknown) => {
        setIsConnected(_socket.isConnected);
        Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT, _socket.isConnected, data);
      });
  
      _socket.addEventListener(BASE_CHANNEL_ENUM.RECONNECT_ERROR, (data: unknown) => {
        setIsConnected(_socket.isConnected);
        Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.RECONNECT_ERROR, _socket.isConnected, data);
      });
  
      _socket.addEventListener(BASE_CHANNEL_ENUM.RECONNECT_FAILED, (data: unknown) => {
        setIsConnected(_socket.isConnected);
        Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.RECONNECT_FAILED, _socket.isConnected, data);
      });
  
      _socket.addEventListener(BASE_CHANNEL_ENUM.DISCONNECT, (data: unknown) => {
        setIsConnected(_socket.isConnected);
        Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.DISCONNECT, _socket.isConnected, data);
      });
    }
  }, [wallet, host, path]);

  React.useEffect(() => {
    createWebSocket();
  }, [createWebSocket])

  React.useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    }
  }, [socket])

  const contextValue = React.useMemo(() => {
    return {
      socket,
      host,
      path,
      isConnected
    }
  }, [
    socket,
    host,
    path,
    isConnected
  ]);

  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  );
};

export default SocketProvider;