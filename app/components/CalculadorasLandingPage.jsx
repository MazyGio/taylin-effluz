import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../assets/localization/translations';
import { Await, Link } from 'react-router';
import { Image } from "@shopify/hydrogen";
import { LandingPageLanguageSelector } from './LandingPageLanguageSelector';
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { ButtonLinkWithDetail } from './ButtonLinkWithDetail';

// ====================================================================================
// SHARED CONFIGURATION AND HELPERS
// ====================================================================================

export default function CalculadorasLandingPage({isLoggedInPromise}) {
    const { language, setLanguage } = useLanguage();
    const t = translations[language];

    return (
        <div>
            <div className="fixed top-0 right-0 p-8 z-10">
                <LandingPageLanguageSelector language={language} setLanguage={setLanguage} />
            </div>
            <div className="relative h-[44rem] sm:h-[34rem] lg:h-[40rem] bg-lightGray2">
                <div className="absolute h-full right-0 hidden sm:block">
                    <Image src="/app/assets/effluz-hero-image.jpg" alt="Calculadoras Effluz" className="h-full" />
                </div>

                <div className="absolute flex flex-col sm:flex-row pl-4 pr-4 w-full h-full">
                    <div className="flex flex-4 flex-col p-4 gap-y-8">
                        <div className="flex-row flex-2 pt-2">
                            <div className="flex justify-start max-h-[6rem] sm:justify-normal sm:max-h-[8rem]">
                                <Image src="/app/assets/logo-effluz.png" alt="Effluz Logo" className="max-w-[6rem] sm:max-w-[8rem]" />
                                <Image src="/app/assets/sello-taylin.png" alt="Taylin Logo" className="max-w-[6rem] sm:max-w-[8rem]" />
                            </div>
                        </div>
                        <div className="flex-col flex-3 pl-6">
                            <h1 className="flex text-4xl lg:text-5xl text-primary font-extrabold pb-2">{t.landing.title}</h1>
                            <p className="flex text-base lg:text-lg">{t.landing.subtitle}</p>
                        </div>
                        <div className="flex flex-5 justify-center px-6 block sm:hidden">
                            <Image src="/app/assets/effluz-demo-image-mobile.jpg" alt="Demo Calculadoras Effluz" className="max-w-[20rem]" />
                        </div>
                        <div className="flex flex-2 justify-normal">
                            <Await resolve={isLoggedInPromise}>
                                {/* TODO: Add check for user tags and check if user has access to calculators */}
                                {(isLoggedIn) => (
                                    isLoggedIn ? 
                                        <ButtonLinkWithDetail 
                                            to="/cart/50805268709668:1" 
                                            label={t.landing.purchaseAccess}  
                                            // detail={t.landing.purchaseDetail}
                                            className="text-left text-2xl bg-blue2 text-white py-1 px-4 mx-4 w-full" 
                                        /> 
                                    : 
                                        <ButtonLinkWithDetail 
                                            to="/cart/50805268709668:1" 
                                            label={t.landing.purchaseAccess} 
                                            // detail={t.landing.purchaseDetail} 
                                            className="text-left text-2xl bg-blue2 text-white py-1 px-4 w-full" 
                                        /> 
                                )}
                            </Await>
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