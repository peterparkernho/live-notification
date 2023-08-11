import EventEmitter from 'events';
import {
  io, ManagerOptions, Socket, SocketOptions,
} from 'socket.io-client';
import Logger from '../Logger';
import { BASE_CHANNEL_ENUM, LISTEN_TYPE_ENUM } from './constants';
import { ACCESS_TOKEN } from '../Constants';

class WebSocket extends EventEmitter {
  private ns: string;
  private host: string
  private path: string
  private ws?: Socket;

  constructor(_ns: string, _host: string, _path: string) {
    super();
    this.ns = _ns;
    this.host = _host;
    this.path = _path;

    Logger.info('WebSocket: constructor ', this.ns, this.host, this.path);

    this.init();
  }

  public get isConnected(): boolean {
    return !!this.ws?.connected;
  }

  init(): void {
    Logger.info('WebSocket: init ', this.ns, this.host, this.path);
    this.createConnection();
    this.listen();
  }

  disconnect(): void {
    this.ws?.disconnect();
  }

  createConnection(): void {
    Logger.info('WebSocket: createConnection ', this.ns, this.host, this.path);
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const opts: Partial<ManagerOptions & SocketOptions> = {
        auth: {
          token,
        }
      };
      if (this.path !== '') {
        opts.path = this.path;
      }
      Logger.info('WebSocket: createConnection ', `${this.host}/${this.ns}`, opts);
      this.ws = io(`${this.host}/${this.ns}`, opts);
    } else {
      const opts: Partial<ManagerOptions & SocketOptions> = {}
      if (this.path !== '') {
        opts.path = this.path;
      }
      Logger.info('WebSocket: createConnection with anonymous user', `${this.host}/${this.ns}`, opts);
      this.ws = io(`${this.host}/${this.ns}`, opts);
    }
  }

  listen(): void {
    Logger.info('WebSocket: listen ', this.ns, this.host, this.path);
    this.ws?.on(BASE_CHANNEL_ENUM.CONNECT, ((data: unknown) => {
      Logger.info(`WebSocket: ${this.ns}: Received `, BASE_CHANNEL_ENUM.CONNECT, this.ws?.connected, data);
      this.emit(`${this.ns}${LISTEN_TYPE_ENUM.ON}${BASE_CHANNEL_ENUM.CONNECT}`, data);
    }) as any);

    this.ws?.on(BASE_CHANNEL_ENUM.RECONNECT, (data: unknown) => {
      Logger.info(`WebSocket: ${this.ns}: Received `, BASE_CHANNEL_ENUM.RECONNECT, this.ws?.connected, data);
      this.emit(`${this.ns}${LISTEN_TYPE_ENUM.ON}${BASE_CHANNEL_ENUM.RECONNECT}`, data);
    });

    this.ws?.on(BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT, (data: unknown) => {
      Logger.info(`WebSocket: ${this.ns}: Received `, BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT, this.ws?.connected, data);
      this.emit(`${this.ns}${LISTEN_TYPE_ENUM.ON}${BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT}`, data);
    });

    this.ws?.on(BASE_CHANNEL_ENUM.RECONNECT_ERROR, (data: unknown) => {
      Logger.info(`WebSocket: ${this.ns}: Received `, BASE_CHANNEL_ENUM.RECONNECT_ERROR, this.ws?.connected, data);
      this.emit(`${this.ns}${LISTEN_TYPE_ENUM.ON}${BASE_CHANNEL_ENUM.RECONNECT_ERROR}`, data);
    });

    this.ws?.on(BASE_CHANNEL_ENUM.RECONNECT_FAILED, (data: unknown) => {
      Logger.info(`WebSocket: ${this.ns}: Received `, BASE_CHANNEL_ENUM.RECONNECT_FAILED, this.ws?.connected, data);
      this.emit(`${this.ns}${LISTEN_TYPE_ENUM.ON}${BASE_CHANNEL_ENUM.RECONNECT_FAILED}`, data);
    });

    this.ws?.on(BASE_CHANNEL_ENUM.DISCONNECT, (data: unknown) => {
      Logger.info(`WebSocket: ${this.ns}: Received `, BASE_CHANNEL_ENUM.DISCONNECT, this.ws?.connected, data);
      this.emit(`${this.ns}${LISTEN_TYPE_ENUM.ON}${BASE_CHANNEL_ENUM.DISCONNECT}`, data);
    });
  }

  sendEmit(event: string | symbol, ...args: any[]): WebSocket {
    Logger.info('WebSocket: sendEmit', event, ...args);
    if (this.ws) {
      this.ws?.emit(event as any, ...args);
      Logger.info('WebSocket: sendEmit', event, ...args, 'successed');
      return this;
    }
    Logger.info('WebSocket: sendEmit', event, ...args, 'failed');
    return this;
  }
}

export default WebSocket;