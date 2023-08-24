export type BaseEventName = 'connect' | 'reconnect' | 'reconnect_attempt' | 'reconnect_error' | 'reconnect_failed' | 'disconnect';

export enum BASE_CHANNEL_ENUM {
  CONNECT = 'connect',
  RECONNECT = 'reconnect',
  RECONNECT_ATTEMPT = 'reconnect_attempt',
  RECONNECT_ERROR = 'reconnect_error',
  RECONNECT_FAILED = 'reconnect_failed',
  DISCONNECT = 'disconnect',
}

export enum LISTEN_TYPE_ENUM {
  ON = 'on',
  OFF = 'off'
}