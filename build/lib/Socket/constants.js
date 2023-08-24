"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LISTEN_TYPE_ENUM = exports.BASE_CHANNEL_ENUM = void 0;
var BASE_CHANNEL_ENUM;
(function (BASE_CHANNEL_ENUM) {
    BASE_CHANNEL_ENUM["CONNECT"] = "connect";
    BASE_CHANNEL_ENUM["RECONNECT"] = "reconnect";
    BASE_CHANNEL_ENUM["RECONNECT_ATTEMPT"] = "reconnect_attempt";
    BASE_CHANNEL_ENUM["RECONNECT_ERROR"] = "reconnect_error";
    BASE_CHANNEL_ENUM["RECONNECT_FAILED"] = "reconnect_failed";
    BASE_CHANNEL_ENUM["DISCONNECT"] = "disconnect";
})(BASE_CHANNEL_ENUM = exports.BASE_CHANNEL_ENUM || (exports.BASE_CHANNEL_ENUM = {}));
var LISTEN_TYPE_ENUM;
(function (LISTEN_TYPE_ENUM) {
    LISTEN_TYPE_ENUM["ON"] = "on";
    LISTEN_TYPE_ENUM["OFF"] = "off";
})(LISTEN_TYPE_ENUM = exports.LISTEN_TYPE_ENUM || (exports.LISTEN_TYPE_ENUM = {}));
//# sourceMappingURL=constants.js.map