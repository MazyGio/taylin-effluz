import { useNavigate } from 'react-router';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../assets/localization/translations";

export function ButtonCalculadoraDeServicios() {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <button
            onClick={() => navigate('/calculadora-servicios')}
            className="w-full text-center cursor-pointer py-6 px-4 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg bg-blue2"
        >
            {t.consultoria.title}
            <span className="block text-sm font-normal mt-1 opacity-90">({t.consultoria.summary})</span>
        </button>
    );
};