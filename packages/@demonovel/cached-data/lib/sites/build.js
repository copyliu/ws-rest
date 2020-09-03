"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.buildCore = void 0;
const util_1 = require("./build/util");
const bluebird_1 = __importDefault(require("bluebird"));
const esjzone_1 = __importDefault(require("./build/esjzone"));
const default_1 = __importDefault(require("./build/default"));
const masiro_1 = __importDefault(require("./build/masiro"));
function buildCore(siteID, source) {
    let fn;
    switch (siteID) {
        case 'esjzone':
            fn = esjzone_1.default;
            break;
        case 'dmzj':
        case 'wenku8':
            fn = default_1.default;
            break;
        case 'masiro':
            fn = masiro_1.default;
            break;
    }
    return util_1.handleEntries(siteID, source, fn);
}
exports.buildCore = buildCore;
function build(source) {
    return bluebird_1.default
        .resolve(Object.keys(source))
        .reduce((a, siteID) => {
        a[siteID] = buildCore(siteID, source);
        return a;
    }, {});
}
exports.build = build;
exports.default = buildCore;
//# sourceMappingURL=build.js.map