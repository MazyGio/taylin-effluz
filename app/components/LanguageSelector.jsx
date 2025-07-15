import brandColors from '../theme/brandColors';

export function LanguageSelector({ language, setLanguage }) {
    return (
        <div className="flex items-center rounded-full p-1" style={{ backgroundColor: brandColors.lightGray3 }}>
            <button
                onClick={() => setLanguage('es')}
                className={`py-1 px-4 rounded-full text-sm font-bold transition-all duration-300 ${language === 'es' ? 'shadow' : ''}`}
                style={{
                    backgroundColor: language === 'es' ? brandColors.primary : 'transparent',
                    color: language === 'es' ? brandColors.lightText : brandColors.darkText,
                }}
            >
                {'ES'}
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`py-1 px-4 rounded-full text-sm font-bold transition-all duration-300 ${language === 'en' ? 'shadow' : ''}`}
                style={{
                    backgroundColor: language === 'en' ? brandColors.primary : 'transparent',
                    color: language === 'en' ? brandColors.lightText : brandColors.darkText,
                }}
            >
                {'EN'}
            </button>
        </div>
    );
};
