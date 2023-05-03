import {useContext} from 'react';
import { SitecopyContext } from './sitecopyProvider';

export const useSitecopy = (filterKeys?:string) => {
    const siteCopyConfig = useContext(SitecopyContext);

    if(!siteCopyConfig){
        console.log('%c Eclipse Sitecopy - ',"color:#FF034E;background:#23102E" , 'Missing sitecopy context, make sure your App is wrapped in <SitecopyProvider>');
        return{
            sitecopy: undefined,
            isLoading: false,
            error: true
        }
    }

    //Pre filter site copy object based on filterKeys param passed in (if present)
    let siteCopy = siteCopyConfig.siteCopy;
    if(filterKeys && siteCopy){
        let splitFilterKeys = filterKeys.split('.');
        splitFilterKeys.forEach( (key:string) => {
            if(!siteCopy){
                console.error('%c Eclipse Sitecopy - ',"color:#FF034E;background:#23102E" ,(`JSON at filterkey ${key} is undefined `));
                return{
                    sitecopy: undefined,
                    isLoading: false,
                    error: true
                }
            }
            siteCopy = siteCopy[key] || undefined
        })
        if(!siteCopy){
            console.error('error in useSiteCopy')
            return{
                sitecopy: undefined,
                isLoading: false,
                error: true
            }
        }
    }
    
    return {
        siteCopy: siteCopy,
        isLoading: siteCopyConfig?.sitecopyLoading,
        error: siteCopyConfig?.error,
        lang: siteCopyConfig.lang,
        setLang:siteCopyConfig.setLang
    }
}