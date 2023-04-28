import {useContext} from 'react';
import { SitecopyContext } from './sitecopyProvider';

export const useSitecopy = () => {
    const sitecopy = useContext(SitecopyContext);

    if(!sitecopy){
        console.log('%c Eclipse Sitecopy - ',"color:#FF034E;background:#23102E" , 'Missing sitecopy context, make sure your App is wrapped in <SitecopyProvider>');
        return{
            sitecopy: undefined,
            isLoading: false,
            error: true
        }
    }


    //add query filtering in here
    
    return {
        sitecopy: sitecopy?.sitecopyPages,
        isLoading: sitecopy?.sitecopyLoading,
        error: sitecopy?.error
    }
}