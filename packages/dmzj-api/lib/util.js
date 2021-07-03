"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDmzjNovelInfoFullWithChapters = exports.isDmzjNovelInfoFull = exports.trimUnsafe = exports.fixDmzjNovelInfo = exports.fixDmzjNovelTags = exports.buildVersion = exports.removeZeroWidth = void 0;
const tslib_1 = require("tslib");
const cloneDeep_1 = (0, tslib_1.__importDefault)(require("lodash/cloneDeep"));
const array_hyper_unique_1 = require("array-hyper-unique");
const crlf_normalize_1 = require("crlf-normalize");
const zero_width_1 = require("zero-width");
Object.defineProperty(exports, "removeZeroWidth", { enumerable: true, get: function () { return zero_width_1.removeZeroWidth; } });
function buildVersion() {
    return {
        channel: "Android",
        version: "2.7.003"
    };
}
exports.buildVersion = buildVersion;
/**
 * 修正 dmzj 小說標籤
 */
function fixDmzjNovelTags(tags) {
    if (typeof tags === 'string') {
        tags = [tags];
    }
    return (0, array_hyper_unique_1.array_unique)(tags.reduce((a, b) => {
        a.push(...b.split('/').map(trimUnsafe));
        return a;
    }, []));
}
exports.fixDmzjNovelTags = fixDmzjNovelTags;
/**
 * 修正 dmzj 上面一些錯誤的資料
 */
function fixDmzjNovelInfo(data) {
    data = (0, cloneDeep_1.default)(data);
    data.name = trimUnsafe(data.name);
    data.authors = trimUnsafe(data.authors);
    data.status = trimUnsafe(data.status);
    data.last_update_volume_name = trimUnsafe(data.last_update_volume_name);
    data.last_update_chapter_name = trimUnsafe(data.last_update_chapter_name);
    data.types = fixDmzjNovelTags(data.types);
    if (isDmzjNovelInfoFull(data)) {
        data.zone = trimUnsafe(data.zone);
        data.introduction = (0, zero_width_1.removeZeroWidth)((0, crlf_normalize_1.crlf)(data.introduction))
            .replace(/^\n+/, '')
            .replace(/[\u00A0]/gu, ' ')
            .replace(/[\s　]+$/g, '')
            .replace(/^ {3,}/gm, '  ');
        if (data.first_letter != null) {
            data.first_letter = trimUnsafe(data.first_letter).toUpperCase();
        }
        data.volume.forEach(vol => {
            vol.volume_name = trimUnsafe(vol.volume_name);
        });
    }
    if (isDmzjNovelInfoFullWithChapters(data)) {
        data.chapters.forEach(ch => {
            ch.volume_name = trimUnsafe(ch.volume_name);
            ch.chapters.forEach(c => {
                c.chapter_name = trimUnsafe(c.chapter_name);
            });
        });
    }
    return data;
}
exports.fixDmzjNovelInfo = fixDmzjNovelInfo;
function trimUnsafe(input) {
    // @ts-ignore
    return (0, zero_width_1.removeZeroWidth)(input)
        .replace(/^\s+|\s+$/gu, '')
        .replace(/\r|\n|[\u00A0]/gu, ' ')
        .replace(/\s+/gu, ' ')
        .trim();
}
exports.trimUnsafe = trimUnsafe;
function isDmzjNovelInfoFull(data) {
    // @ts-ignore
    if (data.zone && data.volume) {
        return true;
    }
}
exports.isDmzjNovelInfoFull = isDmzjNovelInfoFull;
function isDmzjNovelInfoFullWithChapters(data) {
    // @ts-ignore
    if (isDmzjNovelInfoFull(data) && data.chapters) {
        return true;
    }
}
exports.isDmzjNovelInfoFullWithChapters = isDmzjNovelInfoFullWithChapters;
//# sourceMappingURL=util.js.map