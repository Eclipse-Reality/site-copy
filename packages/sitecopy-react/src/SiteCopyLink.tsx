import { useSitecopy } from "./useSitecopy";

export const SiteCopyLink:React.FC<{
        dataCopy:string, 
        className:string, 
    }> = ({dataCopy, className}) => {

    const {siteCopy} = useSitecopy(dataCopy)

    return (
        <a 
            className={className}
            target={siteCopy?.newTab ? '_blank' : '_self'}
            href={siteCopy?.url || ''}
            data-copy={dataCopy}
        >
            {siteCopy?.textContent || ''}
        </a>    
    )
}