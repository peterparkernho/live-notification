// import { useContext, useEffect, useState } from "react";
// import * as React from "react";
// import React from 'react'
import context from "../components/SocketProvider/context";
import Logger from "../Logger";
import { BaseEventName } from "../Socket/constants";


type EventName = 'game-creation' | 'game-join' | 'game-finish-playing';

function useSocketEvent<ReturnDataType>(event: EventName | BaseEventName): ReturnDataType | undefined {
  const [data, setData] = React.useState<ReturnDataType>();
  const { socket, isConnected } = React.useContext(context);

  React.useEffect(() => {
    const handler = (data: ReturnDataType) => {
      Logger.info(`WebSocket: ${event} `, data);
      setData(data)
    }

    if (socket && isConnected) {
      Logger.info(`Subscribe WebSocket event: ${event} start`);
      socket.addEventListener(event, handler);
    } else {
      Logger.info(`Subscribe WebSocket event: ${event} waiting`);
    }

    return () => {
      if (socket) {
        Logger.info(`UnSubscribe WebSocket event: ${event}`);
        socket.removeEventListener(event, handler);
      }
    }
  }, [socket, event, isConnected]);

  return data as ReturnDataType;
}

export default useSocketEvent;
