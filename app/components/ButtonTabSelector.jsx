export function ButtonTabSelector({ isActiveTab, onClick, tabId, children }) {
    return (
        <button
            onClick={onClick}
            className={`cursor-pointer py-2 px-2 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 w-full h-full flex items-center justify-center text-center tab-selector ${tabId === 'tab3' ? 'md:px-4 lg:px-10' : ''} ${isActiveTab ? 'active-tab' : ''}`}
        >
            {children}
        </button>
    );
}