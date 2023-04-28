export type SitecopyClient = {
    sitecopyLoading:boolean,
    sitecopyPages:any
    error:boolean
}

export type SitecopyProviderProps = {
    url:string,
    cacheKey?:string
}

export type SiteCopyHookState = {
    loading:boolean,
    siteCopy:object | undefined
    error:boolean
}

type SiteCopyReturnedAction = {
    type:'sitecopy-returned'
    [siteCopy:string]:any
}
type SiteCopyFetchErrorAction = {
    type:'fetch-error'
    error:boolean
}

export type SiteCopyReducerActions = SiteCopyReturnedAction | SiteCopyFetchErrorAction;