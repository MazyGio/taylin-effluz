import React, { useState } from 'react';

export function Tooltip({ tooltipText, isTooltipLeft = false }) {
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the tooltip's visibility
    const toggleTooltip = () => {
        setIsOpen(!isOpen);
    };

    // Function to close the tooltip if clicking outside
    const handleClickOutside = (event) => {
        if (event.target.closest('.tooltip-container') === null) {
            setIsOpen(false);
        }
    };

    // Add and remove event listener for clicks outside the tooltip
    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (

        <div className="relative group tooltip-container ml-2 flex items-center"> {/* Added a class for external clicks */}
            {/* Desktop (Hover) - Still works as before */}
            <span
                className="cursor-help inline-flex items-center justify-center rounded-full w-4 h-4 text-white text-xs font-bold bg-accent1" // Retain group-hover for desktop
                onMouseEnter={() => setIsOpen(true)} // Optional: Keep hover functionality
                onMouseLeave={() => setIsOpen(false)} // Optional: Keep hover functionality
                onClick={toggleTooltip} // Mobile (Tap)
            >
                i
            </span>

            {/* Mobile (Tap) & Desktop (Hover) Tooltip */}
            <span
                className={`absolute text-xs rounded p-2 z-10 top-1/2 transform -translate-y-1/2 bg-lightGray1 text-darkBlue shadow-lg ml-2 w-42
                   ${isOpen ? 'block' : 'hidden'}
                   ${isTooltipLeft ? 'mobile-tooltip-left' : 'mobile-tooltip-right'}
                   group-hover:block`} // Still responds to group-hover for desktop
            >
                {tooltipText}
            </span>
        </div>
    );
};