"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2019/7/7.
 */
const index_1 = require("@node-novel/site-cache-util/lib/index");
const main_1 = require("./util/main");
exports.default = (0, index_1.lazyRun)(async () => {
    await (0, index_1.lazyImport)('./build/toplist', require);
    await (0, index_1.lazyImport)('./build/task001', require);
    await (0, index_1.lazyImport)('./build/merge', require);
    await (0, index_1.lazyImport)('./build/cache', require);
}, {
    pkgLabel: main_1.pkgLabel,
});
//# sourceMappingURL=build.js.map