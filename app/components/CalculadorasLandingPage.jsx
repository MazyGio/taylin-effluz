import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../assets/localization/translations';
import { Link } from 'react-router';
import { Image } from "@shopify/hydrogen";
import { LandingPageLanguageSelector } from './LandingPageLanguageSelector';
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { ButtonLinkWithDetail } from './ButtonLinkWithDetail';
import { calculadoraTags } from '~/custom-data/calculadoraTags';

// ====================================================================================
// SHARED CONFIGURATION AND HELPERS
// ====================================================================================

export default function CalculadorasLandingPage({ isLoggedIn, customerDetails }) {
    const { language, setLanguage } = useLanguage();
    const t = translations[language];

    const customer = isLoggedIn ? customerDetails.data.customer : null;
    let hasAccess = false;
    let to = "";
    let label = "";
    let detail = "";

    if (customer && customer.tags.some(tag => calculadoraTags.includes(tag))) {
        hasAccess = true;
    }

    if (!isLoggedIn) {
        to = "/account/login";
        label = t.landing.purchaseAccess;
        detail = t.landing.purchaseDetail;
    } else if (!hasAccess) {
        to = "/cart/50805268709668:1";
        label = t.landing.purchaseAccess;
        detail = t.landing.purchaseDetail;
    } else {
        to = "/calculadoras";
        label = t.landing.launchApp;
    }

    const buttonStyles = "text-left text-2xl bg-blue2 text-white py-1 px-4 w-full";

    const ButtonLaunchApp = () => (
        <ButtonLinkWithDetail
            to={to}
            label={label}
            detail={detail}
            className={buttonStyles}
        />
    );

    // const ButtonPurchaseAccess = () => (
    //     <ButtonLinkWithDetail 
    //         to="/cart/50805268709668:1" 
    //         label={t.landing.purchaseAccess} 
    //         detail={t.landing.purchaseDetail} 
    //         className="text-left text-2xl bg-blue2 text-white py-1 px-4 w-full" 
    //     /> 
    // );

    // const ButtonLaunchApp = () => (
    //     <ButtonLinkWithDetail
    //         to="/calculadoras"
    //         label={t.landing.launchApp}
    //         className="text-left text-2xl bg-blue2 text-white py-1 px-4 w-full"
    //     />
    // )

    return (
        <div>
            <div className="fixed top-0 right-0 p-8 z-10">
                <LandingPageLanguageSelector language={language} setLanguage={setLanguage} />
            </div>
            <div className="relative sm:h-[34rem] lg:h-[40rem] bg-lightGray2">
                <div className="sm:absolute right-0 hidden sm:block h-full">
                    <Image src="/images/effluz-hero-image.jpg" alt="Calculadoras Effluz" className="h-full" sizes="(max-width: 640px)" />
                </div>

                <div className="sm:absolute flex flex-col sm:flex-row pl-4 pr-4 w-full h-full">
                    <div className="flex flex-4 flex-col p-4 gap-y-8">
                        <div id="logo-container" className="flex-row flex-3 pt-2">
                            <div className="flex justify-start max-h-[6rem] sm:justify-normal sm:max-h-[8rem]">
                                <Image src="/images/logo-effluz.png" alt="Effluz Logo" className="max-w-[6rem] sm:max-w-[8rem]" sizes="(max-width: 160px) 4rem, 6rem" />
                                <Image src="/images/sello-taylin.png" alt="Taylin Logo" className="max-w-[6rem] sm:max-w-[8rem]" sizes="(max-width: 160px) 4rem, 6rem" />
                            </div>
                        </div>
                        <div id="title-container" className="flex-col flex-5 pl-6">
                            <h1 className="flex text-4xl lg:text-5xl text-primary font-extrabold pb-2">{t.landing.title}</h1>
                            <p className="flex text-base lg:text-lg">{t.landing.subtitle}</p>
                        </div>
                        <div className="flex flex-5 justify-center px-6 block sm:hidden">
                            <Image src="/images/effluz-demo-image-mobile.jpg" alt="Demo Calculadoras Effluz" width={320} className="min-w-[20rem]" />
                        </div>
                        <div className="hidden text-sm text-xs text-md"></div>
                        <div className="flex justify-normal sm:ml-4 sm:mb-4">
                            <ButtonLaunchApp />
                        </div>
                    </div>
                    <div className="flex flex-6 flex-col justify-center sm:justify-end items-center sm:items-end h-full p-2 gap-y-2">
                        <div className="flex flex-row sm:flex-col pb-6 text-5xl text-accent2">
                            <Link to="https://www.instagram.com/effluzpreemiesandtwins/" target="_blank" rel="noopener noreferrer">
                                <FaInstagram />
                            </Link>
                            <Link to="https://www.linkedin.com/company/effluz/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}