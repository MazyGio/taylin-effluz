import { useNavigate } from 'react-router';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../assets/localization/translations";

export function ButtonCalculadoraDePrecios() {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <button
            onClick={() => navigate('/calculadora-precios')}
            className="w-full text-center cursor-pointer py-6 px-4 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg bg-primary"
        >
            {t.precios.title}
            <span className="block text-sm font-normal mt-1 opacity-90">({t.precios.summary})</span>
        </button>
    );
};