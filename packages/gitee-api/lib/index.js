"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiteeV5Client = exports.GITEE_SCOPES = void 0;
const lib_1 = require("restful-decorator/lib");
const decorators_1 = require("restful-decorator/lib/decorators");
const lazy_url_1 = __importDefault(require("lazy-url"));
const lodash_1 = require("lodash");
const headers_1 = require("restful-decorator/lib/decorators/headers");
const error_1 = require("restful-decorator/lib/wrap/error");
const bluebird_1 = __importDefault(require("bluebird"));
const util_1 = require("./util");
const decorators_2 = require("./decorators");
// @ts-ignore
const deep_eql_1 = __importDefault(require("deep-eql"));
const SymApiOptions = Symbol('options');
exports.GITEE_SCOPES = Object.freeze('user_info projects pull_requests issues notes keys hook groups gists enterprises'.split(' '));
let GiteeV5Client = 
/**
 * @see https://gitee.com/api/v5/oauth_doc
 * @link https://gitee.com/api/v5/swagger
 *
 * @todo 好一點的方法命名
 */
class GiteeV5Client extends lib_1.AbstractHttpClient {
    constructor(options) {
        super(options.defaults, options);
    }
    static allScope() {
        return exports.GITEE_SCOPES.slice();
    }
    _init(defaults, options) {
        //let { scope = 'user_info issues notes', clientId, clientSecret, state = 'all' } = options || {};
        let { scope, clientId, clientSecret, state, redirect_uri } = options || {};
        defaults = super._init(defaults);
        this[SymApiOptions] = Object.assign(this[SymApiOptions] || {}, options, {
            scope,
            clientId,
            clientSecret,
            state,
            redirect_uri,
        });
        return defaults;
    }
    setAccessToken(accessToken) {
        this.$http.defaults.headers.Authorization = headers_1._makeAuthorizationValue(accessToken, "token" /* Token */);
        return this;
    }
    requestAccessToken(code, redirect_uri, redirect_uri2) {
        let url = new lazy_url_1.default('/oauth/token', this.$baseURL);
        let { state, scope, clientSecret, clientId } = this[SymApiOptions];
        let data = new URLSearchParams();
        data.set('client_id', clientId);
        data.set('client_secret', clientSecret);
        data.set('code', code);
        data.set('grant_type', 'authorization_code');
        data.set('redirect_uri', this.redirectUrl(redirect_uri, redirect_uri2).toRealString());
        return bluebird_1.default.resolve(this.$http({
            url: url.toRealString(),
            method: 'POST',
            data,
        }))
            .then(r => r.data)
            .catch(e => {
            if (e.response.data.error) {
                return bluebird_1.default.reject(e.response.data);
            }
            return bluebird_1.default.reject(e);
        });
    }
    refreshAccessToken(refresh_token) {
        return null;
    }
    oauthTokenByPassword(loginData) {
        return null;
    }
    redirectUrl(redirect_uri, redirect_uri2) {
        let url = new lazy_url_1.default('/oauth/authorize', this.$baseURL);
        if (redirect_uri == null) {
            if (!_hasWindow() && (typeof this[SymApiOptions].redirect_uri === 'string')) {
                redirect_uri = this[SymApiOptions].redirect_uri;
            }
            else {
                // @ts-ignore
                redirect_uri = window.location.href;
            }
        }
        else if (typeof redirect_uri != 'string') {
            redirect_uri = redirect_uri.toString();
        }
        if (redirect_uri2) {
            redirect_uri = new lazy_url_1.default(redirect_uri);
            redirect_uri.searchParams.set('_redirect_uri_', redirect_uri2.toString());
            redirect_uri = redirect_uri.toString();
        }
        let { state, scope, clientSecret, clientId } = this[SymApiOptions];
        url.searchParams.set('client_id', clientId);
        url.searchParams.set('redirect_uri', redirect_uri);
        scope && url.searchParams.set('scope', scope);
        state && url.searchParams.set('state', state);
        url.searchParams.set('response_type', 'code');
        return url;
    }
    /**
     * 瀏覽器 only
     */
    redirectAuth(redirect_uri, redirect_uri2, target = 'self') {
        // @ts-ignore
        return window.open(this.redirectUrl(redirect_uri).toString(), redirect_uri2, target || 'self');
    }
    repoContents(setting, isFile) {
        return;
    }
    /**
     * 获取文件Blob
     */
    repoContentsBlobs(setting, autoDecode) {
        if (autoDecode) {
            let data = this.$returnValue;
            data.content = data.content.replace(/\n$/, '');
            let buffer = Buffer.from(data.content, data.encoding);
            return bluebird_1.default.resolve({
                ...data,
                buffer: buffer,
            });
        }
        return;
    }
    repoContentsCreate(setting) {
        return;
    }
    repoContentsUpdate(setting) {
        return;
    }
    userKeys(page, per_page) {
        //console.dir(777);
        //return this.$returnValue.data as any
        return;
    }
    /**
     * 获取仓库的Commit评论
     */
    repoCommitCommentsAll(setting) {
        return;
    }
    /**
     * 获取单个Commit的评论
     */
    repoCommitComments(setting) {
        return;
    }
    /**
     * 获取仓库的某条Commit评论
     */
    repoCommitCommentByID(setting) {
        return;
    }
    repoInfo(setting) {
        return;
    }
    /**
     * 查看仓库的Forks
     */
    repoForks(setting) {
        return;
    }
    /**
     * Fork一个仓库 (原始 api)
     */
    _forkRepo(setting) {
        return;
    }
    /**
     * Fork一个仓库 當發生錯誤時 試圖搜尋已存在的 fork
     * 如果需要使用原始 api 請用 `_forkRepo`
     */
    forkRepo(options) {
        return this._forkRepo(options)
            .catch(async (e) => {
            try {
                let code = e.response.status;
                let data = e.response.data;
                if (code == 403 || data.message === '已经存在同名的仓库, Fork 失败') {
                    let owner;
                    if (options.organization) {
                        owner = options.organization;
                    }
                    else {
                        let useInfo = await this.userInfo();
                        owner = useInfo.login;
                    }
                    let repoInfo = await this.repoInfo({
                        owner,
                        repo: options.repo,
                    });
                    if (util_1.isForkFrom(repoInfo, options)) {
                        return repoInfo;
                    }
                }
                else if (code == 400 || data.message === '已经Fork，不允许重复Fork') {
                    let repoInfo;
                    if (options.organization) {
                        repoInfo = await this.orgHasFork({
                            org: options.organization,
                        }, {
                            repo: options.repo,
                            owner: options.owner,
                        });
                    }
                    else {
                        repoInfo = await this.myHasFork({}, {
                            repo: options.repo,
                            owner: options.owner,
                        });
                    }
                    if (repoInfo) {
                        return repoInfo;
                    }
                }
            }
            catch (e2) {
            }
            return bluebird_1.default.reject(e);
        });
    }
    /**
     * 判断用户是否为仓库成员
     */
    isRepoCollaborators(setting) {
        if (this.$returnValue === '') {
            return true;
        }
        return;
    }
    searchIssues(setting) {
        return;
    }
    /**
     * 两个Commits之间对比的版本差异
     */
    compareCommits(setting) {
        return;
    }
    pullRequestCreate(setting) {
        return;
    }
    repoBranchInfo(setting) {
        return this.repoBranchList(setting);
    }
    repoBranchList(setting) {
        return;
    }
    /**
     * 建立一個分支 (允許將 refs 設定為他人的 repo 下的 commit)
     */
    repoBranchCreate(setting) {
        return;
    }
    /**
     * 建立一個來自他人 repo 分支的分支
     */
    repoBranchCreateByOtherRepo(setting, fromTarget) {
        return this
            .repoBranchInfo(fromTarget)
            .then(ret => {
            return this.repoBranchCreate({
                ...setting,
                refs: ret.commit.sha,
            });
        });
    }
    userInfo() {
        return null;
    }
    /**
     * 获取某个用户的公开仓库
     */
    usersUsernameRepos(options) {
        return null;
    }
    /**
     * 获取一个组织的仓库
     */
    orgsRepos(options) {
        return null;
    }
    /**
     * 列出授权用户的所有仓库
     */
    myRepoList(options) {
        return null;
    }
    userForks(options) {
        if (options.type == null) {
            options.type = 'owner';
        }
        return this.usersUsernameRepos(options)
            .then(ls => {
            if (ls) {
                return util_1.valueToArray(ls).filter(repo => repo.fork);
            }
            return ls;
        });
    }
    orgsForks(options) {
        return this.orgsRepos(options)
            .then(ls => {
            if (ls) {
                return util_1.valueToArray(ls).filter(repo => repo.fork);
            }
            return ls;
        });
    }
    myForks(options) {
        if (options.type == null) {
            options.type = 'owner';
        }
        return this.myRepoList(options)
            .then(ls => {
            if (ls) {
                return util_1.valueToArray(ls).filter(repo => repo.fork);
            }
            return ls;
        });
    }
    _hasFork(fn, userOptions, targetRepoOptions, cache) {
        if (userOptions.type == null) {
            userOptions.type = 'owner';
        }
        // @ts-ignore
        if (userOptions.sort == null) {
            // @ts-ignore
            userOptions.sort = 'updated';
        }
        cache = lodash_1.defaultsDeep(cache || {}, {});
        return fn(userOptions, targetRepoOptions)
            .then(ls => {
            if (ls && ls.length && !deep_eql_1.default(ls, cache.last)) {
                for (let row of ls) {
                    if (util_1.isForkFrom(row, targetRepoOptions)) {
                        return row;
                    }
                }
                const { page = 1 } = userOptions;
                //cache.last2 = ls;
                cache.last = ls;
                return this._hasFork(fn, {
                    ...userOptions,
                    page: page + 1,
                }, targetRepoOptions, cache);
            }
            return null;
        });
    }
    userHasFork(userOptions, targetRepoOptions) {
        return this._hasFork(this.userForks.bind(this), {
            ...userOptions
        }, {
            ...targetRepoOptions
        });
    }
    orgHasFork(orgOptions, targetRepoOptions) {
        let type = orgOptions.type || 'all';
        return this._hasFork(this.orgsForks.bind(this), {
            ...orgOptions,
            type,
        }, {
            ...targetRepoOptions
        });
    }
    myHasFork(userOptions, targetRepoOptions) {
        return this._hasFork(this.myForks.bind(this), {
            ...userOptions
        }, {
            ...targetRepoOptions
        });
    }
};
__decorate([
    decorators_1.POST('/oauth/token'),
    decorators_1.FormUrlencoded,
    decorators_1.BodyData({
        grant_type: 'authorization_code',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "requestAccessToken", null);
__decorate([
    decorators_1.POST('/oauth/token'),
    decorators_1.FormUrlencoded,
    decorators_1.BodyData({
        grant_type: 'refresh_token',
    }),
    decorators_1.methodBuilder({
        returnData: true,
    }),
    __param(0, decorators_1.ParamData('refresh_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "refreshAccessToken", null);
__decorate([
    decorators_1.POST('/oauth/token'),
    decorators_1.FormUrlencoded,
    decorators_1.BodyData({
        grant_type: 'password',
    }),
    decorators_1.methodBuilder(function (info) {
        // @ts-ignore
        let { state, scope, clientSecret, clientId } = info.thisArgv[SymApiOptions];
        info.requestConfig.data.client_id = clientId;
        info.requestConfig.data.client_secret = clientSecret;
        if (!info.requestConfig.data.scope && scope) {
            info.requestConfig.data.scope = scope;
        }
        return info;
    }, {
        returnData: true,
    }),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "oauthTokenByPassword", null);
__decorate([
    decorators_1.GET('/api/v5/repos/{owner}/{repo}/contents{/targetPath}'),
    decorators_1.methodBuilder({
        returnData: true,
    }),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoContents", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/git/blobs/{sha}'),
    decorators_1.methodBuilder({
        returnData: true,
    }),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Boolean]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoContentsBlobs", null);
__decorate([
    decorators_1.POST('repos/{owner}/{repo}/contents{targetPath}'),
    decorators_1.FormUrlencoded,
    decorators_1.TransformRequest(function base64(data) {
        if (data.content) {
            data.content = util_1.toBase64(data.content);
        }
        return data;
    }),
    decorators_1.methodBuilder(),
    decorators_2.CatchResponseDataError(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", bluebird_1.default)
], GiteeV5Client.prototype, "repoContentsCreate", null);
__decorate([
    decorators_1.PUT('repos/{owner}/{repo}/contents/{targetPath}'),
    decorators_1.FormUrlencoded,
    decorators_1.TransformRequest(function base64(data) {
        if (data.content) {
            data.content = util_1.toBase64(data.content);
        }
        return data;
    }),
    decorators_1.methodBuilder({
        returnData: true,
    }),
    decorators_1.CatchError(function (e) {
        return bluebird_1.default.reject(error_1.mergeAxiosErrorWithResponseData(e));
    }),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", bluebird_1.default)
], GiteeV5Client.prototype, "repoContentsUpdate", null);
__decorate([
    decorators_1.GET('user/keys'),
    decorators_1.methodBuilder({
        returnData: true,
    }),
    __param(0, decorators_1.ParamData('page')),
    __param(1, decorators_1.ParamData('per_page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "userKeys", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/comments'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoCommitCommentsAll", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/commits/{ref}/comments'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoCommitComments", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/comments/{id}'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoCommitCommentByID", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoInfo", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/forks'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoForks", null);
__decorate([
    decorators_1.POST('repos/{owner}/{repo}/forks'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "_forkRepo", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/collaborators/{username}'),
    decorators_1.methodBuilder(),
    decorators_1.CatchError(function (e) {
        if (e.response.data.message === "404 Not Found") {
            return false;
        }
        return bluebird_1.default.reject(e);
    }),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "isRepoCollaborators", null);
__decorate([
    decorators_1.GET('search/issues'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "searchIssues", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/compare/{base}...{head}'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "compareCommits", null);
__decorate([
    decorators_1.POST('repos/{owner}/{repo}/pulls'),
    decorators_1.methodBuilder(),
    decorators_1.CatchError(function (e) {
        if (e.response.data.message === "Target branch源分支与目标分支一致，无法发起PR。") {
            return bluebird_1.default.reject(e.response.data);
        }
        return bluebird_1.default.reject(e);
    }),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "pullRequestCreate", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/branches/{branch}')
    // @ts-ignore
    ,
    decorators_1.HandleParamMetadata((info) => {
        let [setting] = info.argv;
        if (!setting.branch) {
            throw new TypeError(`branch should not to empty ${JSON.stringify(setting.branch)}`);
        }
        return info;
    }),
    decorators_1.methodBuilder({
        autoRequest: false,
    }),
    __param(0, decorators_1.ParamMapAuto({
        branch: 'master',
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoBranchInfo", null);
__decorate([
    decorators_1.GET('repos/{owner}/{repo}/branches{/branch}'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoBranchList", null);
__decorate([
    decorators_1.POST('repos/{owner}/{repo}/branches'),
    decorators_1.methodBuilder(),
    decorators_2.CatchResponseDataError(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "repoBranchCreate", null);
__decorate([
    decorators_1.POST('repos/{owner}/{repo}/branches'),
    decorators_1.methodBuilder({
        autoRequest: false,
    }),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GiteeV5Client.prototype, "repoBranchCreateByOtherRepo", null);
__decorate([
    decorators_1.GET('user'),
    decorators_1.methodBuilder(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "userInfo", null);
__decorate([
    decorators_1.GET('users/{username}/repos'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "usersUsernameRepos", null);
__decorate([
    decorators_1.GET('users/{username}/repos'),
    decorators_1.methodBuilder(),
    __param(0, decorators_1.ParamMapAuto()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "orgsRepos", null);
__decorate([
    decorators_1.GET('user/repos'),
    decorators_1.methodBuilder(),
    decorators_1.HandleParamMetadata((info) => {
        let [setting] = info.argv;
        if (setting && setting.affiliation) {
            if (Array.isArray(setting.affiliation)) {
                setting.affiliation = setting.affiliation(',');
            }
        }
        return info;
    }),
    __param(0, decorators_1.ParamMapQuery()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], GiteeV5Client.prototype, "myRepoList", null);
GiteeV5Client = __decorate([
    decorators_1.BaseUrl('https://gitee.com/api/v5/'),
    decorators_1.Headers({
        'Accept': 'application/json',
    }),
    decorators_1.RequestConfigs({
        responseType: 'json',
    }),
    decorators_1.CacheRequest({
        cache: {
            maxAge: 15 * 60 * 1000,
        },
    })
    /**
     * @see https://gitee.com/api/v5/oauth_doc
     * @link https://gitee.com/api/v5/swagger
     *
     * @todo 好一點的方法命名
     */
    ,
    __metadata("design:paramtypes", [Object])
], GiteeV5Client);
exports.GiteeV5Client = GiteeV5Client;
function _hasWindow() {
    try {
        // @ts-ignore
        if (window.location) {
            return true;
        }
    }
    catch (e) {
    }
    return false;
}
exports.default = GiteeV5Client;
//# sourceMappingURL=index.js.map