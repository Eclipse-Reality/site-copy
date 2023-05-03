import { BlueHero } from "../globalComponents/BlueHero";
import { useSitecopy } from "../siteCopyProvider";

export const Catalog:React.FC<{}> = () => {
    
    const {siteCopy, setLang} = useSitecopy('pages.catalog.components');
    console.log(siteCopy)

    return (<>
        <BlueHero heroText={siteCopy.heroBanner.mainText}/>
        <div onClick={() => setLang && setLang('en')} className='py-[36px] md:py-[52px] custom-breakpoint-container'>
            <p className='max-w-[730px] text-[1.6rem] leading-[2.4rem] text-[#3c3c3c] font-[390] inline-block mb-[22px] md:mb-[32px]'>
                {siteCopy.abstractSection.description}
            </p>
            <div className='flex flex-col gap-[25px] 980px:flex-row 980px:justify-between 980px:items-center border border-sap-blue pt-[11px] pb-[18px] 980px:py-[8px] px-[14px] 908px:px-[12px]'>
                <p className='text-[1.6rem] leading-[2.4rem] text-[#3c3c3c] font-[390]'>{siteCopy.abstractSection.ctaDescription}</p>
                <a href='https://go3.events.sap.com/sapsapphire/virtual/2023/reg/flow/sap/sapsapphire23/channels-staging/page/overview' className='btn-primary w-full max-w-[265px] md:max-w-[auto] md:w-fit text-center'>Browse by channels</a>
            </div>
        </div>
    </>)
}