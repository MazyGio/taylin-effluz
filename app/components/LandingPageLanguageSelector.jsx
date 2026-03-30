export function LandingPageLanguageSelector({ language, setLanguage }) {
    return (
        <div className="flex flex-col sm:flex-row items-center rounded-full p-1 bg-lightGray3">
            <button
                onClick={() => setLanguage('es')}
                className={`py-1 px-1 sm:px-4 cursor-pointer rounded-full text-sm font-bold transition-all duration-300 ${language === 'es' ? 'shadow bg-primary text-lightText' : 'bg-transparent text-darkText'}`}
            >
                {'ES'}
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`py-1 px-1 sm:px-4 cursor-pointer rounded-full text-sm font-bold transition-all duration-300 ${language === 'en' ? 'shadow bg-primary text-lightText' : 'bg-transparent text-darkText'}`}
            >
                {'EN'}
            </button>
        </div>
    );
};
