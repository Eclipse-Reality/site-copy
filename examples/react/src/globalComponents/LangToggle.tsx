import { useSitecopy } from "../siteCopyProvider";

export default function LangToggle(){

    const {siteCopy, setLang, isLoading, error, lang} = useSitecopy();

    if(isLoading){return <p>...Loading</p>}
    if(error){return <p>...error fetching site copy</p>}

    console.log(siteCopy)

    function findLanguage(){
        const curLang = Object.keys(siteCopy.languages).filter((key)=> siteCopy.languages[key].code == lang )
        return siteCopy.languages[curLang[0]].title;
    }

    return(
        <div className="flex flex-col w-fit bg-white p-5 gap-5">
            <p>
                Current Language: {findLanguage()}
            </p>

            <button className="p-2 border-blue-500 border-solid border-[1px] text-blue-500 hover:text-white hover:bg-blue-900" onClick={()=> setLang && setLang(siteCopy.languages.english.code)}>
                {siteCopy.languages.english.title}
            </button>
            <button className="p-2 border-blue-500 border-solid border-[1px] text-blue-500 hover:text-white hover:bg-blue-900" onClick={()=> setLang && setLang(siteCopy.languages.spanish.code)}>
                {siteCopy.languages.spanish.title}
            </button>
            <button className="p-2 border-blue-500 border-solid border-[1px] text-blue-500 hover:text-white hover:bg-blue-900" onClick={()=> setLang && setLang(siteCopy.languages.french.code)}>
                {siteCopy.languages.french.title}
            </button>
        </div>
    )
}