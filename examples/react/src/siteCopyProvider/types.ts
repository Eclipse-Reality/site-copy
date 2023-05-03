export type SitecopyClient = {
    sitecopyLoading:boolean,
    siteCopy:any
    error:boolean
    lang:string | null
    setLang:Function
}

export type SitecopyProviderProps = {
    url:string,
    siteID?:string
    defaultLang?:string | null
}

export type SiteCopyHookState = {
    loading:boolean,
    siteCopy:object | undefined
    error:boolean
    lang:string | null
}

type SiteCopyReturnedAction = {
    type:'sitecopy-returned'
    [siteCopy:string]:any
}
type SiteCopyFetchErrorAction = {
    type:'fetch-error'
    error:boolean
}
type SiteCopyLangChangeAction = {
    type:'lang-change',
    newLang:string
}

export type SiteCopyReducerActions = SiteCopyReturnedAction | SiteCopyFetchErrorAction | SiteCopyLangChangeAction;