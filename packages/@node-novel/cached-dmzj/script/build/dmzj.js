"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const bluebird_1 = __importDefault(require("bluebird"));
const util_1 = require("../util");
const index_1 = require("@node-novel/site-cache-util/lib/index");
const files_1 = __importDefault(require("../util/files"));
exports.default = index_1.lazyRun(async () => {
    const { api, saveCache } = await util_1.getDmzjClient();
    const file = files_1.default.recentUpdate;
    const file2 = files_1.default.task001;
    let novelList = await fs_extra_1.default.readJSON(file)
        .catch(e => null);
    const taskList = await (fs_extra_1.default.readJSON(file2)
        .catch(e => { })) || {};
    let n = Infinity;
    let old_len = novelList && novelList.list && novelList.list.length | 0 || 0;
    if (novelList && novelList.list && novelList.list.length > 20 * 10) {
        n = 10;
    }
    await api.novelRecentUpdateAll(0, n, {
        delay: 3000,
    })
        .then(async (data) => {
        if (data == null) {
            return novelList;
        }
        else if (novelList != null && (novelList.last_update_time != data.last_update_time || novelList.list.length != data.list.length)) {
            let ls = await bluebird_1.default
                .resolve(data.list || [])
                .reduce((a, v) => {
                a[v.id] = v;
                return a;
            }, {});
            novelList.list
                .forEach(v => {
                if (!(v.id in ls)) {
                    data.list.push(v);
                }
            });
        }
        return data;
    })
        .tap(async (data) => {
        data.list = await bluebird_1.default
            .resolve(data.list)
            .map(async (v) => {
            if (taskList[v.id] > v.last_update_time) {
                let _file = path_1.default.join(util_1.__root, 'data', 'novel/info', `${v.id}.json`);
                let json = await fs_extra_1.default.readJSON(_file).catch(e => null);
                if (json && json.last_update_time == taskList[v.id]) {
                    Object
                        .keys(v)
                        .forEach((k) => {
                        if (k in json) {
                            // @ts-ignore
                            v[k] = json[k];
                        }
                    });
                    return v;
                }
            }
            if (!taskList[v.id] || taskList[v.id] != v.last_update_time) {
                taskList[v.id] = 0;
            }
            return v;
        });
    })
        .tap((data) => {
        data.list.sort((a, b) => {
            return b.id - a.id;
        });
        novelList = novelList || {};
        data.end = Math.max(data.end | 0, novelList.end | 0);
        data.last_update_time = Math.max(data.last_update_time | 0, novelList.last_update_time | 0);
        let length = data.list.length;
        util_1.consoleDebug.dir({
            length,
            add: length - old_len,
        });
        return bluebird_1.default.all([
            fs_extra_1.default.outputJSON(file, data, {
                spaces: 2,
            }),
            fs_extra_1.default.outputJSON(file2, taskList, {
                spaces: 2,
            }),
        ]);
    });
}, {
    pkgLabel: __filename
});
//# sourceMappingURL=dmzj.js.map