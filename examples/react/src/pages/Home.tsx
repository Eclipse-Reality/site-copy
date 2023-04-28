import { BlueHero } from "../globalComponents/BlueHero";

export const Home:React.FC<{pageCopy:any}> = ({pageCopy}) => {
    
    return (<>
        <BlueHero heroText={pageCopy.components.heroBanner.mainText}/>
    </>)
}