"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteCopyProvider = exports.SiteCopyContext = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
exports.SiteCopyContext = (0, react_1.createContext)(undefined);
var SiteCopyProvider = function (props) {
    //get the sitecopy from storage if present (using the passed cache key). Key is needed to pull from cache
    !props.siteID && console.log('%c Eclipse Sitecopy - ', "color:#FF034E;background:#23102E", 'No siteID passed into SitecopyProvider, cached copy will not load.');
    var siteCopyStorage = localStorage.getItem('ECLIPSE_SITECOPY') && JSON.parse(localStorage.getItem('ECLIPSE_SITECOPY') || '{}');
    var initialState = {
        loading: siteCopyStorage && props.siteID && siteCopyStorage[props.siteID] ? false : true,
        siteCopy: siteCopyStorage && props.siteID && siteCopyStorage[props.siteID] || undefined,
        error: false,
        lang: (props.siteID && siteCopyStorage && siteCopyStorage[props.siteID] && siteCopyStorage[props.siteID].clientLang) || props.defaultLang || null,
    };
    var _a = (0, react_1.useReducer)(siteCopyReducer, initialState), sitecopyState = _a[0], dispatch = _a[1];
    //fetch the sitecopy and run a reducer action based on what's returned
    (0, react_1.useEffect)(function () {
        fetch(props.url)
            .then(function (response) { return response.json(); })
            .then(function (json) { return dispatch({
            type: 'sitecopy-returned',
            siteCopy: json
        }); })
            .catch(function (_err) { return dispatch({
            type: 'fetch-error',
            error: true
        }); });
    }, []);
    return ((0, jsx_runtime_1.jsx)(exports.SiteCopyContext.Provider, tslib_1.__assign({ value: {
            siteCopy: sitecopyState.siteCopy,
            sitecopyLoading: sitecopyState.loading,
            error: sitecopyState.error,
            lang: sitecopyState.lang,
            setLang: function (newLang) { return changeLanguage(newLang); }
        } }, { children: props.children })));
    function changeLanguage(newLang) {
        if (sitecopyState.lang === newLang) {
            return;
        }
        dispatch({
            type: 'lang-change',
            newLang: newLang
        });
    }
    function siteCopyReducer(state, action) {
        switch (action.type) {
            case 'sitecopy-returned':
                if (!siteCopyStorage) {
                    localStorage.setItem('ECLIPSE_SITECOPY', JSON.stringify(action.siteCopy));
                }
                else {
                    //if lang is set in storage under this site id, make sure it is appended on when the new storage is set
                    if (state.lang) {
                        action.siteCopy[Object.keys(action.siteCopy)[0]].clientLang = state.lang;
                    }
                    //if storage exists, spread this copy object into it and set it again (to hold multiple site copies in cache under one storage key)
                    var newSiteCopyStorage = tslib_1.__assign(tslib_1.__assign({}, siteCopyStorage), action.siteCopy);
                    localStorage.setItem('ECLIPSE_SITECOPY', JSON.stringify(newSiteCopyStorage));
                }
                return tslib_1.__assign(tslib_1.__assign({}, state), { loading: false, siteCopy: action.siteCopy[Object.keys(action.siteCopy)[0]] });
            case 'fetch-error':
                console.error('%c Eclipse Sitecopy - ', "color:#FF034E;background:#23102E", 'There was an error when fetching sitecopy. Check that the URL being passed into useSiteCopy is valid JSON.');
                return tslib_1.__assign(tslib_1.__assign({}, state), { loading: false, error: true });
            case 'lang-change': {
                siteCopyStorage[Object.keys(siteCopyStorage)[0]].clientLang = action.newLang;
                localStorage.setItem('ECLIPSE_SITECOPY', JSON.stringify(siteCopyStorage));
                return tslib_1.__assign(tslib_1.__assign({}, state), { lang: action.newLang });
            }
        }
    }
};
exports.SiteCopyProvider = SiteCopyProvider;
//# sourceMappingURL=siteCopyProvider.js.map