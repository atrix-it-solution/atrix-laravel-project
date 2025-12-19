// import AppLogoIcon from './app-logo-icon';

// const AppLogoImage = "/logo/logo-white.svg"

// export default function AppLogo() {
//     return (
//         <>
//             <div className="flex items-center justify-center ">
//                 <img src={AppLogoImage} alt='Atrix' className='img-fluid' height={'200px'} width={'200px'}/>
//             </div>
//         </>
//     );
// }


import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Laravel Starter Kit
                </span>
            </div>
        </>
    );
}
