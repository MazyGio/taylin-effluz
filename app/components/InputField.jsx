import brandColors from '../styles/brandColors';

export function InputField({ label, value, onChange, type = 'number', min = '0', step = '0.01', tooltipText = '', placeholder = '0', hasPrefix = false, prefix = '', hasSuffix = false, suffix = '' }) {
    return (
        <div className="mb-4">
            <div className="flex items-center mb-2"> {/* Flex container for label and icon */}
                <label className="block text-gray-700 text-sm font-bold" style={{ color: brandColors.darkBlue }}>
                    {label}:
                </label>
                {tooltipText && (
                    <span
                        className="ml-2 cursor-pointer text-white rounded-full flex items-center justify-center w-4 h-4 text-xs font-bold"
                        style={{ backgroundColor: brandColors.accent1 }}
                        title={tooltipText} // Use native tooltip for simplicity and elegance
                    >
                        i
                    </span>
                )}
            </div>
            <div className="relative">
                {hasPrefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">{prefix}</span>}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    min={min}
                    step={step}
                    placeholder={placeholder}
                    style={{ borderColor: brandColors.accent1, paddingLeft: hasPrefix ? '1.5rem' : '0.7rem' }}
                />
                {hasSuffix && <span className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-500">{suffix}</span>}
            </div>
        </div>
    );
};