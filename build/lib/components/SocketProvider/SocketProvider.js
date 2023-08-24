"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// import React, { useCallback, useEffect, useMemo, useState } from "react";
var React = require("react");
var Logger_1 = require("../../Logger");
var Socket_1 = require("../../Socket");
var Api_1 = require("../../Api");
var Constants_1 = require("../../Constants");
var context_1 = require("./context");
var constants_1 = require("../../Socket/constants");
var SocketProvider = function (_a) {
    var children = _a.children, logger = _a.logger, host = _a.host, path = _a.path, apiEndpoint = _a.apiEndpoint, wallet = _a.wallet;
    var _b = React.useState(), socket = _b[0], setSocket = _b[1];
    var _c = React.useState(false), isConnected = _c[0], setIsConnected = _c[1];
    React.useEffect(function () {
        Logger_1.default.setInstance(logger);
    }, [logger]);
    var createWebSocket = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var _socket, api, res, sign;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!apiEndpoint) return [3 /*break*/, 6];
                    if (!(!localStorage.getItem(Constants_1.ACCESS_TOKEN) && wallet)) return [3 /*break*/, 4];
                    api = new Api_1.default(apiEndpoint);
                    return [4 /*yield*/, api.loginByWallet()];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, wallet.signMessage(res.message)];
                case 2:
                    sign = _a.sent();
                    return [4 /*yield*/, api.completeLoginByWallet({
                            message: res.message,
                            address: wallet.address,
                            signature: sign,
                        })];
                case 3:
                    _a.sent();
                    _socket = new Socket_1.WebSocket(host, path, {
                        credential: true,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    _socket = new Socket_1.WebSocket(host, path, {
                        credential: false,
                    });
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    _socket = new Socket_1.WebSocket(host, path, {
                        credential: false,
                    });
                    _a.label = 7;
                case 7:
                    setSocket(_socket);
                    if (_socket) {
                        Logger_1.default.info("WebSocket: listen base events");
                        _socket.addEventListener(constants_1.BASE_CHANNEL_ENUM.CONNECT, (function (data) {
                            setIsConnected(_socket.isConnected);
                            Logger_1.default.info("WebSocket: Received ", constants_1.BASE_CHANNEL_ENUM.CONNECT, _socket.isConnected, data);
                        }));
                        _socket.addEventListener(constants_1.BASE_CHANNEL_ENUM.RECONNECT, function (data) {
                            setIsConnected(_socket.isConnected);
                            Logger_1.default.info("WebSocket: Received ", constants_1.BASE_CHANNEL_ENUM.RECONNECT, _socket.isConnected, data);
                        });
                        _socket.addEventListener(constants_1.BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT, function (data) {
                            setIsConnected(_socket.isConnected);
                            Logger_1.default.info("WebSocket: Received ", constants_1.BASE_CHANNEL_ENUM.RECONNECT_ATTEMPT, _socket.isConnected, data);
                        });
                        _socket.addEventListener(constants_1.BASE_CHANNEL_ENUM.RECONNECT_ERROR, function (data) {
                            setIsConnected(_socket.isConnected);
                            Logger_1.default.info("WebSocket: Received ", constants_1.BASE_CHANNEL_ENUM.RECONNECT_ERROR, _socket.isConnected, data);
                        });
                        _socket.addEventListener(constants_1.BASE_CHANNEL_ENUM.RECONNECT_FAILED, function (data) {
                            setIsConnected(_socket.isConnected);
                            Logger_1.default.info("WebSocket: Received ", constants_1.BASE_CHANNEL_ENUM.RECONNECT_FAILED, _socket.isConnected, data);
                        });
                        _socket.addEventListener(constants_1.BASE_CHANNEL_ENUM.DISCONNECT, function (data) {
                            setIsConnected(_socket.isConnected);
                            Logger_1.default.info("WebSocket: Received ", constants_1.BASE_CHANNEL_ENUM.DISCONNECT, _socket.isConnected, data);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [wallet, host, path]);
    React.useEffect(function () {
        createWebSocket();
    }, [createWebSocket]);
    React.useEffect(function () {
        return function () {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);
    var contextValue = React.useMemo(function () {
        return {
            socket: socket,
            host: host,
            path: path,
            isConnected: isConnected
        };
    }, [
        socket,
        host,
        path,
        isConnected
    ]);
    return (React.createElement(context_1.default.Provider, { value: contextValue }, children));
};
exports.default = SocketProvider;
//# sourceMappingURL=SocketProvider.js.map