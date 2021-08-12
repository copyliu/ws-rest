"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._checkLogin = void 0;
function _checkLogin($) {
    let username = $('.member-info:eq(0) a.head-account-btn[href*="member/home"]')
        .text()
        .replace(/^\s+|\s+$/g, '');
    if (username === null || username === void 0 ? void 0 : username.length) {
        return username;
    }
    return null;
}
exports._checkLogin = _checkLogin;
//# sourceMappingURL=_checkLogin.js.map