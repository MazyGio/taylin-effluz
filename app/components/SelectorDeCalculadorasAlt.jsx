import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../assets/localization/translations';
import { ButtonComprarAcceso } from './ButtonComprarAcceso';
import { ButtonCalculadoraDePrecios } from './ButtonCalculadoraDePrecios';
import { ButtonCalculadoraDeServicios } from './ButtonCalculadoraDeServicios';
import { ButtonCalculadoraDeUtilidad } from './ButtonCalculadoraDeUtilidad';
import { Await } from 'react-router';

// ====================================================================================
// SHARED CONFIGURATION AND HELPERS
// ====================================================================================

export default function SelectorDeCalculadorasAlt({isLoggedInPromise}) {
    const { language } = useLanguage();
    const t = translations[language];
    // console.log(language);

    return (
        <div className="h-dvh bg-lightGray2">
            <div className="text-center p-12">
                <h1
                    className="text-4xl sm:text-5xl font-extrabold mb-2 text-primary"
                >
                    {t.common.welcome}
                </h1>
                <p
                    className="text-xl text-darkBlue"
                >
                    {t.common.selectCalculator}
                </p>
            </div>
            <div
                className="flex flex-col items-center min-h-screen p-4"
            >
                <div className="w-full max-w-lg flex flex-col gap-6">
                    <Await resolve={isLoggedInPromise}>
                        {(isLoggedIn) => (
                            isLoggedIn ?
                                <>
                                    <ButtonCalculadoraDePrecios />
                                    <ButtonCalculadoraDeServicios />
                                    <ButtonCalculadoraDeUtilidad />
                                </>
                                :
                                <ButtonComprarAcceso />
                        )}
                    </Await>
                </div>
                <div className="text-center mt-12">
                    <p className="text-xs text-darkBlue mt-4 px-2">
                        {t.common.disclaimer}
                    </p>
                </div>
            </div>
        </div>
    );
}