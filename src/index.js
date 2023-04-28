export const initSiteCopyProvider = () => {

    //============================================================================================================================
    // Custom element which wraps other HTML elements and updates their copy if they (the children) have a data-copy attribute set
    //============================================================================================================================
    class SiteCopyProviderElement extends HTMLElement {

        constructor(){
            super();      
            this.copyUrl = this.getAttribute('url');
            this.siteID = this.getAttribute('siteid');
            this.cachedCopy = localStorage.getItem('ECLIPSE_SITECOPY') && JSON.parse(localStorage.getItem('ECLIPSE_SITECOPY') || '{}'); 
        }
        
        connectedCallback(){
            //this is used to check if any providers that share urls have already done a fetch
            this.setAttribute('awaitingfetch','true');
            //this is used to set copy on all providers with the same url after one has finished it's fetch
            this.setAttribute('fetchcomplete','false');


            //get the sitecopy from storage if present (using the passed cache key). Key is needed to pull from cache
            if(!this.siteID){
                console.log('%c Eclipse Sitecopy - ',"color:#FF034E;background:#23102E" , `No 'siteid' attribute was passed into <site-copy-provider>, copy will not be able to load.`);
                return
            }else{
                if(this.cachedCopy){
                    this.updateChildrenCopy(this.cachedCopy);
                } 
            } 

            //if 2+ providers have the same url, this ensures that the fetch only runs once 
            // (other providers with this url should not get passed this condition)
            if( document.querySelector(`site-copy-provider[url='${this.copyUrl}']`).getAttribute('awaitingfetch') === 'false'){
                return
            }
            this.setAttribute('awaitingfetch','false');

            //fetching json from url attribute
            fetch(this.copyUrl)
            .then( (response) => response.json())
            .then( (json) => {
                //set the storage key if it doesn't exist
                if(!this.cachedCopy){
                    localStorage.setItem('ECLIPSE_SITECOPY', JSON.stringify(json));
                }else{
                    //if storage exists, spread this copy object into it and set it again (to hold multiple site copies in cache under one storage key)
                    let newSiteCopyStorage = {...this.cachedCopy, ...json};
                    localStorage.setItem('ECLIPSE_SITECOPY',JSON.stringify(newSiteCopyStorage));
                    this.cachedCopy = JSON.stringify(newSiteCopyStorage);
                }

                //get all providers with this url and set the fetch complete attr to true
                //this will trigger a re render of the copy on all same-url providers from the attribute update 
                document.querySelectorAll(`site-copy-provider[url='${this.copyUrl}']`).forEach( (provider) => {
                    provider.setAttribute('fetchcomplete','true');
                })
                
            })
            .catch((err) => console.error('%c Eclipse Sitecopy - ',"color:#FF034E;background:#23102E" ,'There was an error when fetching sitecopy. Check that the URL being passed into useSiteCopy is valid JSON.'))
        }  

        //array of attributes that trigger attributeChangedCallback when changed (native to web components)
        static get observedAttributes(){
            return ['fetchcomplete'];
        }

        //this will only fire if the fetch is successful and new site copy is saved to storage
        attributeChangedCallback(name,oldValue,newValue){
            if(!oldValue){return}
            const currentSiteCopyStorage = localStorage.getItem('ECLIPSE_SITECOPY') && JSON.parse(localStorage.getItem('ECLIPSE_SITECOPY') || '{}'); 
            this.updateChildrenCopy(currentSiteCopyStorage);
        }

        //main method which actually updates the innerText of the elements based on their data-copy attribute
        updateChildrenCopy(copy){
            if(!this.siteID){return};
            copy = copy[this.siteID];
            let filterKeys = this.getAttribute('filterkeys');

            //this lets you pass in a base path for nested copy for prefiltering
            if(filterKeys){
                filterKeys = filterKeys.split('.');
                filterKeys.forEach((key)=> {
                    copy = copy[key] || copy
                })
            }

            //loops over all children with data-copy attribute set
            Array.from( (this.children)).forEach( (childElement) => {
                if(!childElement.dataset.copy) return
                const copyObjectKeys = childElement.dataset.copy.split('.');
                let childElementCopy = copy;
                copyObjectKeys.forEach( (key) => {
                    childElementCopy = childElementCopy[key] || childElementCopy;
                });
                childElement.textContent = childElementCopy;
            })
        }
        
    }

    window.customElements.define('site-copy-provider', SiteCopyProviderElement);
}