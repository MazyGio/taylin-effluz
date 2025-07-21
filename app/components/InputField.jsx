import { Tooltip } from './Tooltip';

export function InputField({ label, value, onChange, type = 'number', min = '0', step = '0.01', tooltipText = '', isTooltipLeft = false, placeholder = '0', hasPrefix = false, prefix = '', hasSuffix = false, suffix = '' }) {
    return (
        <div className="mb-4">
            <div className="flex items-center mb-2"> {/* Flex container for label and icon */}
                <label className="block text-sm font-bold text-darkBlue">
                    {label}:
                </label>
                {tooltipText && <Tooltip tooltipText={tooltipText} isTooltipLeft={isTooltipLeft} />}
            </div>
            <div className="relative">
                {hasPrefix && <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">{prefix}</span>}
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 border-accent1 leading-tight focus:outline-none focus:shadow-outline ${hasPrefix ? 'pl-6' : 'pl-3'}`}
                    min={min}
                    step={step}
                    placeholder={placeholder}
                />
                {hasSuffix && <span className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-500">{suffix}</span>}
            </div>
        </div>
    );
};