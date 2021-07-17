"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._getBookInfo = void 0;
const tslib_1 = require("tslib");
const trim_1 = require("./trim");
const _getBookTranslator_1 = require("./_getBookTranslator");
const _getBookTags_1 = require("./_getBookTags");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const regexp_cjk_1 = require("regexp-cjk");
const _handleBookInfo_1 = require("./_handleBookInfo");
const _getImgSrc_1 = require("./_getImgSrc");
function _getBookInfo($, novel_id, baseURL) {
    novel_id = novel_id.toString();
    let authors = [];
    let _author = (0, trim_1.trimUnsafe)($('.n-detail .author').text());
    if (_author.length) {
        authors.push(_author);
    }
    let translator = (0, _getBookTranslator_1._getBookTranslator)($);
    let tags = (0, _getBookTags_1._getBookTags)($);
    let _date = (0, trim_1.trimUnsafe)($('.n-detail .n-update .s-font').text());
    let updated;
    if (_date === null || _date === void 0 ? void 0 : _date.length) {
        updated = (0, moment_1.default)(_date).valueOf();
    }
    let content = (0, trim_1.trimUnsafe)($('.content .brief').text())
        .replace(new regexp_cjk_1.zhRegExp(/^简介(?:：|:)\s*/), '');
    let title = (0, trim_1.trimUnsafe)($('.novel-title').text());
    let _img = $('.content .with-border .has-img img.img');
    let cover = (0, _getImgSrc_1._getImgSrc)(_img, baseURL);
    let last_update_name = (0, trim_1.trimUnsafe)($('.n-update .nw-a').text().replace(new regexp_cjk_1.zhRegExp(/^\s*最新(?:：|:)\s*/), ''));
    let status_text = (0, trim_1.trimUnsafe)($('.n-status').text().replace(new regexp_cjk_1.zhRegExp(/^\s*状态(?:：|:)\s*/), ''));
    if (status_text === null || status_text === void 0 ? void 0 : status_text.length) {
        tags !== null && tags !== void 0 ? tags : (tags = []);
        tags.push(status_text);
    }
    let book = {
        id: novel_id,
        title,
        cover,
        authors,
        translator,
        tags,
        updated,
        status_text,
        last_update_name,
        content,
    };
    (0, _handleBookInfo_1._handleBookInfo)(book);
    return book;
}
exports._getBookInfo = _getBookInfo;
//# sourceMappingURL=_getBookInfo.js.map