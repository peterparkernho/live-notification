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
var chalk_1 = require("chalk");
var getPrefix = function () {
    return "".concat(chalk_1.default.bold.cyan("[".concat(new Date().toISOString(), "]")), " ").concat(chalk_1.default.bold.yellow('[live-notification]'));
};
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prefix = function () {
        return getPrefix();
    };
    Logger.setInstance = function (inst) {
        Logger.instance = inst;
    };
    Logger.error = function () {
        var _a;
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        if (Logger.instance) {
            (_a = Logger.instance.error).call.apply(_a, __spreadArray([Logger.instance.error, Logger.prefix()], rest, false));
        }
    };
    Logger.info = function () {
        var _a;
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        if (Logger.instance) {
            (_a = Logger.instance.info).call.apply(_a, __spreadArray([Logger.instance.info, Logger.prefix()], rest, false));
        }
    };
    Logger.debug = function () {
        var _a;
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        if (Logger.instance) {
            (_a = Logger.instance.debug).call.apply(_a, __spreadArray([Logger.instance.debug, Logger.prefix()], rest, false));
        }
    };
    Logger.warn = function () {
        var _a;
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        if (Logger.instance) {
            (_a = Logger.instance.warn).call.apply(_a, __spreadArray([Logger.instance.warn, Logger.prefix()], rest, false));
        }
    };
    Logger.log = function () {
        var _a;
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        if (Logger.instance) {
            (_a = Logger.instance.log).call.apply(_a, __spreadArray([Logger.instance.log, Logger.prefix()], rest, false));
        }
    };
    return Logger;
}());
exports.default = Logger;
//# sourceMappingURL=index.js.map