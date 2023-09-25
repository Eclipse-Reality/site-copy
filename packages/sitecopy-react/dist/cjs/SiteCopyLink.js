"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteCopyLink = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var useSitecopy_1 = require("./useSitecopy");
var SiteCopyLink = function (_a) {
    var dataCopy = _a.dataCopy, className = _a.className;
    var siteCopy = (0, useSitecopy_1.useSitecopy)(dataCopy).siteCopy;
    return ((0, jsx_runtime_1.jsx)("a", tslib_1.__assign({ className: className, target: (siteCopy === null || siteCopy === void 0 ? void 0 : siteCopy.newTab) ? '_blank' : '_self', href: (siteCopy === null || siteCopy === void 0 ? void 0 : siteCopy.url) || '', "data-copy": dataCopy }, { children: (siteCopy === null || siteCopy === void 0 ? void 0 : siteCopy.textContent) || '' })));
};
exports.SiteCopyLink = SiteCopyLink;
//# sourceMappingURL=SiteCopyLink.js.map