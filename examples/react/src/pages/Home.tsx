import { BlueHero } from "../globalComponents/BlueHero";
import LangToggle from "../globalComponents/LangToggle";
import { useSitecopy } from "../siteCopyProvider";

export const Home = () => {

    const {siteCopy, isLoading, error, lang} = useSitecopy('pages.home.components.heroBanner');

    if(isLoading){return <p>...Loading</p>}
    if(error){return <p>...error fetching site copy</p>}

    return (<>
        <LangToggle />
        <BlueHero  heroText={siteCopy.mainText[lang || 'en']}/>
        <p> {siteCopy.subText[lang || 'en']} </p>
    </>)
}