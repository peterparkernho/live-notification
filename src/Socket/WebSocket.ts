/* eslint-disable @typescript-eslint/no-explicit-any */
import EventEmitter from 'events';
import {
  io, ManagerOptions, Socket, SocketOptions,
} from 'socket.io-client';
import Logger from '../Logger';
import { BASE_CHANNEL_ENUM } from './constants';
import { ACCESS_TOKEN } from '../Constants';

class WebSocket extends EventEmitter {
  private host: string
  private path: string
  private ws?: Socket;

  constructor(_host: string, _path: string) {
    super();
    this.host = _host;
    this.path = _path;

    Logger.info('WebSocket: constructor ', this.host, this.path);

    this.init();
  }

  public get isConnected(): boolean {
    return !!this.ws?.connected;
  }

  init(): void {
    Logger.info('WebSocket: init ', this.host, this.path);
    this.createConnection();
    this.listen();
  }

  disconnect(): void {
    this.ws?.disconnect();
  }

  createConnection(): void {
    Logger.info('WebSocket: createConnection ', this.host, this.path);
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
      Logger.info('WebSocket: createConnection ', `${this.host}/${this.path}`, opts);
      this.ws = io(`${this.host}/${this.path}`, opts);
    } else {
      const opts: Partial<ManagerOptions & SocketOptions> = {}
      if (this.path !== '') {
        opts.path = this.path;
      }
      Logger.info('WebSocket: createConnection with anonymous user', `${this.host}/${this.path}`, opts);
      this.ws = io(`${this.host}/${this.path}`, opts);
    }
  }

  listen(): void {
    Logger.info('WebSocket: listen ', this.path, this.host);
    this.ws?.on(BASE_CHANNEL_ENUM.CONNECT, ((data: unknown) => {
      Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.CONNECT, this.ws?.connected, data);
    }) as any);

    this.ws?.on(BASE_CHANNEL_ENUM.RECONNECT, (data: unknown) => {
      Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.RECONNECT, this.ws?.connected, data);
    });

    this.ws?.on(BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT, (data: unknown) => {
      Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT, this.ws?.connected, data);
    });

    this.ws?.on(BASE_CHANNEL_ENUM.RECONNECT_ERROR, (data: unknown) => {
      Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.RECONNECT_ERROR, this.ws?.connected, data);
    });

    this.ws?.on(BASE_CHANNEL_ENUM.RECONNECT_FAILED, (data: unknown) => {
      Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.RECONNECT_FAILED, this.ws?.connected, data);
    });

    this.ws?.on(BASE_CHANNEL_ENUM.DISCONNECT, (data: unknown) => {
      Logger.info(`WebSocket: Received `, BASE_CHANNEL_ENUM.DISCONNECT, this.ws?.connected, data);
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