"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useCallback, useContext, useEffect, useRef } from "react";
var React = require("react");
var context_1 = require("../components/SocketProvider/context");
var useSocketProvider = function () {
    var _a = React.useContext(context_1.default), socket = _a.socket, isConnected = _a.isConnected;
    var socketRef = React.useRef(socket);
    React.useEffect(function () {
        socketRef.current = socket;
    }, []);
    var sendEmit = React.useCallback(function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (socketRef.current) {
            return (_a = socketRef.current).sendEmit.apply(_a, __spreadArray([event], args, false));
        }
    }, []);
    return {
        socket: socket,
        isConnected: isConnected,
        sendEmit: sendEmit,
    };
};
exports.default = useSocketProvider;
//# sourceMappingURL=useSocketProvider.js.map