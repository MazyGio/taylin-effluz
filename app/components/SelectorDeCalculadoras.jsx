import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../assets/localization/translations';
import { ButtonLinkWithDetail } from './ButtonLinkWithDetail';
import { calculadoraTags } from '~/custom-data/calculadoraTags';

// ====================================================================================
// SHARED CONFIGURATION AND HELPERS
// ====================================================================================

export default function SelectorDeCalculadoras({isLoggedIn, customerDetails}) {
    const { language } = useLanguage();
    const t = translations[language];
    // console.log(language);

    const customer = isLoggedIn ? customerDetails.data.customer : null;
    let hasAccess = false;

    if (customer && customer.tags.some(tag => calculadoraTags.includes(tag))) {
        hasAccess = true;
    }

    const ButtonCalculadoraDePrecios = () => (
        <ButtonLinkWithDetail
            to="/calculadora-precios"
            label={t.precios.title}
            detail={t.precios.summary}
            className="text-center text-2xl text-white p-4 w-full bg-primary"
        />
    );

    const ButtonCalculadoraDeServicios = () => (
        <ButtonLinkWithDetail
            to="/calculadora-servicios"
            label={t.consultoria.title}
            detail={t.consultoria.summary}
            className="text-center text-2xl text-white p-4 w-full bg-blue2"
        />
    );

    const ButtonCalculadoraDeUtilidad = () => (
        <ButtonLinkWithDetail
            to="/calculadora-utilidad"
            label={t.utilidad.title}
            detail={t.utilidad.summary}
            className="text-center text-2xl text-white p-4 w-full bg-green2"
        />
    );

    const ButtonComprarAcceso = () => (
        <ButtonLinkWithDetail
            to={ isLoggedIn ? "/cart/50805268709668:1" : "/account/login" }
            label={t.common.purchaseAccess}
            detail={t.common.purchaseDetail}
            className="text-center text-2xl text-white p-4 w-full bg-primary"
        />
    );

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
                    {
                        hasAccess ?
                            <>
                                <ButtonCalculadoraDePrecios />
                                <ButtonCalculadoraDeServicios />
                                <ButtonCalculadoraDeUtilidad />
                            </>
                            :
                            <ButtonComprarAcceso />
                    }
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