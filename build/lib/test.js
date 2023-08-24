"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var components_1 = require("./components");
function Test() {
    return (react_1.default.createElement(components_1.SocketProvider, { host: "Test", path: "Test" },
        react_1.default.createElement("div", null, "Test")));
}
exports.default = Test;
//# sourceMappingURL=test.js.map