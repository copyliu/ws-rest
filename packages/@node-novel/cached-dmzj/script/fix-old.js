"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const util_1 = require("./util");
const fs_extra_1 = require("fs-extra");
const bluebird_cancellation_1 = (0, tslib_1.__importDefault)(require("bluebird-cancellation"));
const util_2 = require("dmzj-api/lib/util");
const bluebird_1 = (0, tslib_1.__importDefault)(require("@bluelovers/fast-glob/bluebird"));
const files_1 = (0, tslib_1.__importDefault)(require("./util/files"));
exports.default = (async () => {
    const file = files_1.default.recentUpdate;
    const file2 = files_1.default.task001;
    const recentUpdate = await bluebird_cancellation_1.default
        .resolve((0, fs_extra_1.readJSON)(file))
        .then(async (data) => {
        data.list = data.list.map(util_2.fixDmzjNovelInfo);
        await (0, fs_extra_1.outputJSON)(file, data, {
            spaces: 2,
        });
        return data.list
            .reduce((a, b) => {
            a[b.id] = b;
            return a;
        }, {});
    });
    const taskList = await ((0, fs_extra_1.readJSON)(file2)
        .catch(e => { })) || {};
    await bluebird_1.default.async([
        '*.json',
    ], {
        cwd: path_1.default.join(util_1.__root, 'data', 'novel/info'),
        absolute: true,
    })
        .each(async (file) => {
        var _a;
        let v = await (0, fs_extra_1.readJSON)(file).then(util_2.fixDmzjNovelInfo);
        const { id, last_update_time } = v;
        if (!taskList[id]) {
            if (((_a = recentUpdate[id]) === null || _a === void 0 ? void 0 : _a.last_update_time) === last_update_time) {
                util_1.consoleDebug.debug(`taskList:update`, id, taskList[id], '=>', last_update_time, v.name);
                taskList[id] = last_update_time;
            }
        }
        return (0, fs_extra_1.writeJSON)(file, v, {
            spaces: 2,
        });
    });
    await (0, fs_extra_1.writeJSON)(file2, taskList, {
        spaces: 2,
    });
})();
//# sourceMappingURL=fix-old.js.map