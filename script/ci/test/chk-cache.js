"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bluebird_1 = tslib_1.__importDefault(require("@bluelovers/fast-glob/bluebird"));
const index_1 = require("@node-novel/site-cache-util/lib/index");
const project_root_1 = require("../../project-root");
const bluebird_2 = tslib_1.__importDefault(require("bluebird"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const filesize_1 = require("filesize");
exports.default = (0, index_1.lazyRun)(async () => {
    let __root = project_root_1.__rootWs;
    index_1.console.log(`__root:`, __root);
    let cwd = index_1.path.join(__root, 'packages/@node-novel');
    let ls = await bluebird_1.default.async([
        'cached-*/test/temp/*',
    ], {
        cwd,
        ignore: [
            '**/task001.json',
            'cached-dmzj/test/temp/info2.json',
            'cached-dmzj/test/temp/info3.json',
        ],
    });
    index_1.console.log(`cached temp files`, ls.length, "\n");
    await bluebird_2.default.resolve(ls)
        .each(async (v) => {
        let stat = await fs_extra_1.default.stat(index_1.path.join(cwd, v));
        index_1.console.log("\t", v, `=>`, (0, filesize_1.filesize)(stat.size));
    });
    index_1.console.log("\n");
    //console.dir(ls);
}, {
    pkgLabel: __filename,
});
//# sourceMappingURL=chk-cache.js.map