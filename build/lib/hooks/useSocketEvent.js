"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { useContext, useEffect, useState } from "react";
var React = require("react");
var context_1 = require("../components/SocketProvider/context");
var Logger_1 = require("../Logger");
function useSocketEvent(event) {
    var _a = React.useState(), data = _a[0], setData = _a[1];
    var _b = React.useContext(context_1.default), socket = _b.socket, isConnected = _b.isConnected;
    React.useEffect(function () {
        var handler = function (data) {
            Logger_1.default.info("WebSocket: ".concat(event, " "), data);
            setData(data);
        };
        if (socket && isConnected) {
            Logger_1.default.info("Subscribe WebSocket event: ".concat(event, " start"));
            socket.addEventListener(event, handler);
        }
        else {
            Logger_1.default.info("Subscribe WebSocket event: ".concat(event, " waiting"));
        }
        return function () {
            if (socket) {
                Logger_1.default.info("UnSubscribe WebSocket event: ".concat(event));
                socket.removeEventListener(event, handler);
            }
        };
    }, [socket, event, isConnected]);
    return data;
}
exports.default = useSocketEvent;
//# sourceMappingURL=useSocketEvent.js.map