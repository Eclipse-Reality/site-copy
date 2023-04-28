import { createContext, useEffect, useReducer } from "react";
import { SitecopyClient,SitecopyProviderProps,SiteCopyHookState,SiteCopyReducerActions } from "./types";


export const SitecopyContext = createContext<SitecopyClient | undefined>(undefined)

export const SitecopyProvider = (props:React.PropsWithChildren<SitecopyProviderProps>) => {

    //get the sitecopy from storage if present (using the passed cache key). Key is needed to pull from cache
    const siteCopyStorage = localStorage.getItem('ECLIPSE_SITECOPY') && JSON.parse(localStorage.getItem('ECLIPSE_SITECOPY') || '{}');
    !props.cacheKey && console.log('%c Eclipse Sitecopy - ',"color:#FF034E;background:#23102E" , 'No cache key passed into SitecopyProvider, cached copy will not load.');

    let initialState = {
        loading: siteCopyStorage && props.cacheKey && siteCopyStorage[props.cacheKey] ? false : true,
        siteCopy: siteCopyStorage && props.cacheKey && siteCopyStorage[props.cacheKey] || undefined,
        error:false,
    }

    const [sitecopyState,dispatch] = useReducer(siteCopyReducer,initialState);

    //fetch the sitecopy and run a reducer action based on what's returned
    useEffect( () => {
        fetch(props.url)
          .then( (response) => response.json())
          .then( (json) => dispatch({
            type:'sitecopy-returned',
            siteCopy:json
          }))
          .catch((err) => dispatch({
            type:'fetch-error',
            error:true
          }))
      },[])
    
    return (
        <SitecopyContext.Provider value={{
            sitecopyPages: sitecopyState.siteCopy?.pages,
            sitecopyLoading:sitecopyState.loading,
            error:sitecopyState.error,
        }}>
            {props.children}
        </SitecopyContext.Provider>
    )

    function siteCopyReducer(state: SiteCopyHookState,action:SiteCopyReducerActions){
        switch(action.type){
          case 'sitecopy-returned':
            if(!siteCopyStorage){
              localStorage.setItem('ECLIPSE_SITECOPY', JSON.stringify(action.siteCopy));
            }else{
              //if storage exists, spread this copy object into it and set it again (to hold multiple site copies in cache under one storage key)
              let newSiteCopyStorage = {...siteCopyStorage, ...action.siteCopy};
              localStorage.setItem('ECLIPSE_SITECOPY',JSON.stringify(newSiteCopyStorage));
            }
            return {
              ...state,
              loading:false,
              siteCopy: action.siteCopy[Object.keys(action.siteCopy)[0]] ,
            }
    
          case 'fetch-error':
            console.error('%c Eclipse Sitecopy - ',"color:#FF034E;background:#23102E" ,'There was an error when fetching sitecopy. Check that the URL being passed into useSiteCopy is valid JSON.')
            return {
              ...state,
              loading:false,
              error:true,
            }
        }
      }
}