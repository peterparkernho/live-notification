import * as React from "react";
export interface SocketProviderProps extends Pick<React.ComponentPropsWithoutRef<'div'>, 'children'> {
    logger?: typeof console;
    host: string;
    path: string;
    apiEndpoint?: string;
    wallet?: any;
}
declare const SocketProvider: ({ children, logger, host, path, apiEndpoint, wallet }: SocketProviderProps) => JSX.Element;
export default SocketProvider;
