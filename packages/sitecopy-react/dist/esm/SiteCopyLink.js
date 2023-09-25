import { __assign } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useSitecopy } from "./useSitecopy";
export var SiteCopyLink = function (_a) {
    var dataCopy = _a.dataCopy, className = _a.className;
    var siteCopy = useSitecopy(dataCopy).siteCopy;
    return (_jsx("a", __assign({ className: className, target: (siteCopy === null || siteCopy === void 0 ? void 0 : siteCopy.newTab) ? '_blank' : '_self', href: (siteCopy === null || siteCopy === void 0 ? void 0 : siteCopy.url) || '', "data-copy": dataCopy }, { children: (siteCopy === null || siteCopy === void 0 ? void 0 : siteCopy.textContent) || '' })));
};
//# sourceMappingURL=SiteCopyLink.js.map