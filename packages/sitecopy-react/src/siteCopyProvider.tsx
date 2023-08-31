import { createContext, useEffect, useReducer } from "react";
import { SitecopyClient, SiteCopyHookState,SiteCopyReducerActions } from "./types";


export const SiteCopyContext = createContext<SitecopyClient | undefined>(undefined)

export const SiteCopyProvider = (props:React.PropsWithChildren<{url:string, siteID?:string, defaultLang?:string | null}>) => {

    //get the sitecopy from storage if present (using the passed cache key). Key is needed to pull from cache
    !props.siteID && console.log('%c Eclipse Sitecopy - ',"color:#FF034E;background:#23102E" , 'No siteID passed into SitecopyProvider, cached copy will not load.');
    const siteCopyStorage = localStorage.getItem('ECLIPSE_SITECOPY') && JSON.parse(localStorage.getItem('ECLIPSE_SITECOPY') || '{}');

    let initialState = {
        loading: siteCopyStorage && props.siteID && siteCopyStorage[props.siteID] ? false : true,
        siteCopy: siteCopyStorage && props.siteID && siteCopyStorage[props.siteID] || undefined,
        error:false,
        lang: (props.siteID && siteCopyStorage && siteCopyStorage[props.siteID] && siteCopyStorage[props.siteID].clientLang) || props.defaultLang  || null,
    }

    const [sitecopyState,dispatch] = useReducer(siteCopyReducer,initialState);

    //fetch the sitecopy and run a reducer action based on what's returned
    useEffect( () => {
        fetch(props.url,{
          cache:'no-store'
        })
          .then( (response) => response.json())
          .then( (json) => dispatch({
            type:'sitecopy-returned',
            siteCopy:json
          }))
          .catch((_err) => dispatch({
            type:'fetch-error',
            error:true
          }))
      },[])
    
    return (
        <SiteCopyContext.Provider value={{
            siteCopy: sitecopyState.siteCopy,
            sitecopyLoading:sitecopyState.loading,
            error:sitecopyState.error,
            lang:sitecopyState.lang,
            setLang: (newLang:string) => changeLanguage(newLang)
        }}>
            {props.children}
        </SiteCopyContext.Provider>
    )

    function changeLanguage(newLang:string){
      if(sitecopyState.lang === newLang){return}
      dispatch({
        type:'lang-change',
        newLang:newLang
      }) 
    }

    function siteCopyReducer(state: SiteCopyHookState,action:SiteCopyReducerActions){
        switch(action.type){
          case 'sitecopy-returned':
            if(!siteCopyStorage){
              localStorage.setItem('ECLIPSE_SITECOPY', JSON.stringify(action.siteCopy));
            }else{
              //if lang is set in storage under this site id, make sure it is appended on when the new storage is set
              if(state.lang){
                action.siteCopy[Object.keys(action.siteCopy)[0]].clientLang = state.lang;
              }
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
          case 'lang-change': {
            siteCopyStorage[Object.keys(siteCopyStorage)[0]].clientLang = action.newLang;
            localStorage.setItem('ECLIPSE_SITECOPY',JSON.stringify(siteCopyStorage));
            return {
              ...state,
              lang: action.newLang
            }
          }
        }
      }
}