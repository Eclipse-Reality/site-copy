export const BlueHero: React.FC<{heroText:string}> = ({heroText}) => {
    return (
        <div className='
            bg-[url(https://static.rainfocus.com/sap/sapsapphire23/static/staticfile/staticfile/Hero_VirtualReg_2600_500%202_1676297621478001Kn4F.png)]
            bg-no-repeat 
            bg-center
            bg-cover
            relative
        '>
            <div className='bg-[#00195a] absolute w-full h-full z-[-1]'></div>
            <div className='custom-breakpoint-container h-[250px] flex items-center'>
                <h1 className='text-white font-[700] text-[2.6rem] leading-[3.1rem] md:text-[4.3rem] md:leading-[5.5rem]'>{heroText}</h1>
            </div>
        </div>
    )
}