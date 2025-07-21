import { useNavigate } from 'react-router';
import { CartForm } from '@shopify/hydrogen';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../assets/localization/translations';

// ====================================================================================
// SHARED CONFIGURATION AND HELPERS
// ====================================================================================

export default function SelectorDeCalculadoras({product, selectedVariant}) {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];
    // console.log(language);

    return (
        <div className="min-h-screen">
            <div
                className="flex flex-col items-center justify-center min-h-screen p-4 bg-lightGray2"
            >
                <div className="text-center mb-12">
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
                <div className="w-full max-w-lg flex flex-col gap-6">
                    <div className="w-full text-center bg-purple cursor-pointer py-2 px-4 mb-8 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                        <CartForm route="/cart" inputs={{lines: [{
                            merchandiseId: selectedVariant.id,
                            quantity: 1,
                            selectedVariant,
                            }]}} action={CartForm.ACTIONS.LinesAdd}
                        >
                            {(fetcher) => (
                                <>
                                    <input
                                        name="acceleratedCheckout"
                                        type="hidden"
                                        value="true"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full cursor-pointer"
                                        // disabled={fetcher.state !== 'idle'}
                                    >
                                        {t.common.purchaseAccess}
                                    </button>
                                </>
                            )}
                        </CartForm>
                    </div>
                    <button
                        onClick={() => navigate('/calculadora-precios')}
                        className="w-full text-center cursor-pointer py-6 px-4 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg bg-primary"
                    >
                        {t.precios.title}
                        <span className="block text-sm font-normal mt-1 opacity-90">({t.precios.summary})</span>
                    </button>

                    <button
                        onClick={() => navigate('/calculadora-servicios')}
                        className="w-full text-center cursor-pointer py-6 px-4 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg bg-blue2"
                    >
                        {t.consultoria.title}
                        <span className="block text-sm font-normal mt-1 opacity-90">({t.consultoria.summary})</span>
                    </button>

                    <button
                        onClick={() => navigate('/calculadora-utilidad')}
                        className="w-full text-center cursor-pointer py-6 px-4 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg bg-green2"
                    >
                        {t.utilidad.title}
                        <span className="block text-sm font-normal mt-1 opacity-90">({t.utilidad.summary})</span>
                    </button>
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