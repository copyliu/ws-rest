"use strict";
/**
 * Created by user on 2020/3/2.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._handleOptions = void 0;
const types_1 = require("./types");
const files_1 = require("../util/files");
function _handleOptions(siteID) {
    let url = new URL(types_1.id_packs_map[siteID], types_1.BASE_URL_GITHUB).href;
    let file = files_1.siteIDCachedSourceFile(siteID);
    let file2 = types_1.id_packs_map[siteID];
    return {
        url,
        file,
        file2,
    };
}
exports._handleOptions = _handleOptions;
//# sourceMappingURL=util.js.map