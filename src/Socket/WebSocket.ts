/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  io, ManagerOptions, Socket, SocketOptions,
} from 'socket.io-client';
import Logger from '../Logger';
import { ACCESS_TOKEN } from '../Constants';

type Option = {
  credential: boolean;
}

class WebSocket {
  private host: string
  private path: string
  private opts: Option;
  private ws?: Socket;

  constructor(_host: string, _path: string, _opts: Option) {
    this.host = _host;
    this.path = _path;
    this.opts = _opts;

    Logger.info('WebSocket: constructor ', this.host, this.path);

    this.init();
  }

  public get isConnected(): boolean {
    return !!this.ws?.connected;
  }

  init(): void {
    Logger.info('WebSocket: init ', this.host, this.path);
    this.createConnection();
  }

  disconnect(): void {
    this.ws?.disconnect();
  }

  createConnection(): void {
    Logger.info('WebSocket: createConnection ', this.host, this.path);
    if (this.opts.credential) {
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
        this.ws = io(`${this.host}`, opts);
      } else {
        const opts: Partial<ManagerOptions & SocketOptions> = {}
        if (this.path !== '') {
          opts.path = this.path;
        }
        Logger.info('WebSocket: createConnection with anonymous user', `${this.host}/${this.path}`, opts);
        this.ws = io(`${this.host}`, opts);
      }
    } else {
      const opts: Partial<ManagerOptions & SocketOptions> = {}
      if (this.path !== '') {
        opts.path = this.path;
      }
      Logger.info('WebSocket: createConnection with anonymous user', `${this.host}/${this.path}`, opts);
      this.ws = io(`${this.host}`, opts);
    }
  }

  addEventListener(eventName: string, handler: (...rest: any) => void) {
    this.ws?.on(eventName, handler);
  }

  removeEventListener(eventName: string, handler: (...rest: any) => void) {
    this.ws?.off(eventName, handler);
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