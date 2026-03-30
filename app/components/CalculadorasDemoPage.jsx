import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../assets/localization/translations';
import { Image } from "@shopify/hydrogen";
import CalculadoraDemoCard from './CalculadoraDemoCard';

// ====================================================================================
// SHARED CONFIGURATION AND HELPERS
// ====================================================================================

export default function CalculadorasDemoPage() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <div>
            <div className="relative h-[100rem] sm:h-[40rem] lg:h-[40rem] bg-darkBlue">
                <div className="flex flex-col p-4 items-center">
                    <div id="demo-title" className="flex flex-row items-center sm:self-start sm:pl-4 mt-6">
                        <div className="h-[4rem] sm:h-[6rem] px-2">
                            <Image src="/app/assets/calc-demo-icon.jpg" alt="Calculadoras Demo" className="max-w-[8rem]" />
                        </div>
                        <div className="px-2">
                            <h1 className="text-3xl text-white font-extrabold">
                                {t.demo.title}
                            </h1>
                        </div>
                    </div>
                    <div id="demo-cards" className="flex flex-col margin-auto sm:flex-row sm:gap-4 lg:gap-8 mt-8 space-y-10 p-6 w-[22.5rem] sm:p-2 sm:w-[40rem] md:w-[48rem] lg:w-[60rem]">
                        <CalculadoraDemoCard
                            title={t.demo.calculadoraNegociosTitle}
                            subtitle={t.demo.calculadoraNegociosSubtitle}
                            headerClassName="bg-primary"
                        >
                            <Image src="/app/assets/calc-demo-image-placeholder.jpg" alt="Calculadora Demo Placehodler" className="w-full h-full" />
                        </CalculadoraDemoCard>
                        <CalculadoraDemoCard
                            title={t.demo.calculadoraServiciosTitle}
                            subtitle={t.demo.calculadoraServiciosSubtitle}
                            headerClassName="bg-blue2"
                        >
                            <Image src="/app/assets/calc-demo-image-placeholder.jpg" alt="Calculadora Demo Placehodler" className="w-full h-full" />
                        </CalculadoraDemoCard>
                        <CalculadoraDemoCard
                            title={t.demo.calculadoraUtilidadTitle}
                            subtitle={t.demo.calculadoraUtilidadSubtitle}
                            headerClassName="bg-darkGreen"
                        >
                            <Image src="/app/assets/calc-demo-image-placeholder.jpg" alt="Calculadora Demo Placehodler" className="w-full h-full" />
                        </CalculadoraDemoCard>
                    </div>
                    <div id="demo-disclaimer" className="mt-4 sm:mt-0">
                        <p className="text-white text-xs">
                            {t.demo.disclaimer}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}