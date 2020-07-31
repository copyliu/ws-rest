"use strict";
/**
 * Created by user on 2020/3/3.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMasiro = void 0;
const util_1 = require("./util");
const cheerio_1 = __importDefault(require("cheerio"));
const moment_1 = require("../../util/moment");
function buildMasiro(siteID, id, data) {
    if (data.subforums && data.subforums.length) {
        return null;
    }
    let item = {};
    item.id = id;
    item.novelID = id;
    item.title = data.forum_name;
    item.chapters_num = data.threads.length;
    try {
        item.content = data.forum_rules;
        item.content = item.content && cheerio_1.default.load(`<body>${item.content}</body>`)(`body`).text();
    }
    catch (e) {
    }
    item.updated = data.last_thread_time && moment_1.createMomentBySeconds(data.last_thread_time).valueOf() || 0;
    if (data.threads[0]) {
        let typeid = data.threads[0].typeid;
        item.last_update_name = util_1.newTitle(data.threads[0].subject, data.thread_types && data.thread_types[typeid]);
    }
    return util_1.newEntry(siteID, item);
}
exports.buildMasiro = buildMasiro;
exports.default = buildMasiro;
//# sourceMappingURL=masiro.js.map