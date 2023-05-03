import { BlueHero } from "../globalComponents/BlueHero";
import { useSitecopy } from "../siteCopyProvider";

export const Home = () => {

    const {siteCopy, setLang, isLoading, error} = useSitecopy('pages.home.components.heroBanner');

    if(isLoading){return <p>...Loading</p>}
    if(error){return <p>...error fetching site copy</p>}

    return (<>
        <BlueHero  heroText={siteCopy.mainText}/>
        <div onClick={()=> setLang && setLang('en')}>Hello</div>
    </>)
}