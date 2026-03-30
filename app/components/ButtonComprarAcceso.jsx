import { useNavigate } from 'react-router';
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../assets/localization/translations";

export function ButtonComprarAcceso() {
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <button
            onClick={() => navigate('/cart/50805268709668:1')}
            className="w-full text-center bg-purple cursor-pointer py-2 px-4 mb-8 rounded-xl text-white font-bold text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
            {t.common.purchaseAccess}
            <span className="block text-sm font-normal mt-1 opacity-90">({t.common.purchaseDetail})</span>
        </button>
    );
};
