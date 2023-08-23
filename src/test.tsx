import React from 'react';

import { SocketProvider } from "./components";

export default function Test() {
  return (
    <SocketProvider host="Test" path="Test"><div>Test</div></SocketProvider>
  )
}