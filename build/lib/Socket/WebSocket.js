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
var socket_io_client_1 = require("socket.io-client");
var Logger_1 = require("../Logger");
var Constants_1 = require("../Constants");
var WebSocket = /** @class */ (function () {
    function WebSocket(_host, _path, _opts) {
        this.host = _host;
        this.path = _path;
        this.opts = _opts;
        Logger_1.default.info('WebSocket: constructor ', this.host, this.path);
        this.init();
    }
    Object.defineProperty(WebSocket.prototype, "isConnected", {
        get: function () {
            var _a;
            return !!((_a = this.ws) === null || _a === void 0 ? void 0 : _a.connected);
        },
        enumerable: false,
        configurable: true
    });
    WebSocket.prototype.init = function () {
        Logger_1.default.info('WebSocket: init ', this.host, this.path);
        this.createConnection();
    };
    WebSocket.prototype.disconnect = function () {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.disconnect();
    };
    WebSocket.prototype.createConnection = function () {
        Logger_1.default.info('WebSocket: createConnection ', this.host, this.path);
        if (this.opts.credential) {
            var token = localStorage.getItem(Constants_1.ACCESS_TOKEN);
            if (token) {
                var opts = {
                    auth: {
                        token: token,
                    }
                };
                if (this.path !== '') {
                    opts.path = this.path;
                }
                Logger_1.default.info('WebSocket: createConnection ', "".concat(this.host, "/").concat(this.path), opts);
                this.ws = (0, socket_io_client_1.io)("".concat(this.host), opts);
            }
            else {
                var opts = {};
                if (this.path !== '') {
                    opts.path = this.path;
                }
                Logger_1.default.info('WebSocket: createConnection with anonymous user', "".concat(this.host, "/").concat(this.path), opts);
                this.ws = (0, socket_io_client_1.io)("".concat(this.host), opts);
            }
        }
        else {
            var opts = {};
            if (this.path !== '') {
                opts.path = this.path;
            }
            Logger_1.default.info('WebSocket: createConnection with anonymous user', "".concat(this.host, "/").concat(this.path), opts);
            this.ws = (0, socket_io_client_1.io)("".concat(this.host), opts);
        }
    };
    WebSocket.prototype.addEventListener = function (eventName, handler) {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.on(eventName, handler);
    };
    WebSocket.prototype.removeEventListener = function (eventName, handler) {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.off(eventName, handler);
    };
    WebSocket.prototype.sendEmit = function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        Logger_1.default.info.apply(Logger_1.default, __spreadArray(['WebSocket: sendEmit', event], args, false));
        if (this.ws) {
            (_a = this.ws) === null || _a === void 0 ? void 0 : _a.emit.apply(_a, __spreadArray([event], args, false));
            Logger_1.default.info.apply(Logger_1.default, __spreadArray(__spreadArray(['WebSocket: sendEmit', event], args, false), ['successed'], false));
            return this;
        }
        Logger_1.default.info.apply(Logger_1.default, __spreadArray(__spreadArray(['WebSocket: sendEmit', event], args, false), ['failed'], false));
        return this;
    };
    return WebSocket;
}());
exports.default = WebSocket;
//# sourceMappingURL=WebSocket.js.map