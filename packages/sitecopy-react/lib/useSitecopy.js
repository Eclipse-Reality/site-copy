"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSitecopy = void 0;
const react_1 = require("react");
const siteCopyProvider_1 = require("./siteCopyProvider");
const useSitecopy = (filterKeys) => {
    const siteCopyConfig = (0, react_1.useContext)(siteCopyProvider_1.SiteCopyContext);
    if (!siteCopyConfig) {
        console.log('%c Eclipse Sitecopy - ', "color:#FF034E;background:#23102E", 'Missing sitecopy context, make sure your App is wrapped in <SitecopyProvider>');
        return {
            sitecopy: undefined,
            isLoading: false,
            error: true
        };
    }
    //Pre filter site copy object based on filterKeys param passed in (if present)
    let siteCopy = siteCopyConfig.siteCopy;
    if (filterKeys && siteCopy) {
        let splitFilterKeys = filterKeys.split('.');
        for (let i = 0; i < splitFilterKeys.length; i++) {
            if (!siteCopy[splitFilterKeys[i]]) {
                console.error('%c Eclipse Sitecopy - ', "color:#FF034E;background:#23102E", (`JSON at filterkey ${splitFilterKeys[i]} is undefined `));
                return {
                    sitecopy: undefined,
                    isLoading: false,
                    error: true
                };
            }
            siteCopy = siteCopy[splitFilterKeys[i]];
        }
    }
    return {
        siteCopy: siteCopy,
        isLoading: siteCopyConfig.sitecopyLoading,
        error: siteCopyConfig.error,
        lang: siteCopyConfig.lang,
        setLang: siteCopyConfig.setLang
    };
};
exports.useSitecopy = useSitecopy;
