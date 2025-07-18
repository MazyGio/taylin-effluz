// Helper function to format numbers as currency
export function formatCurrency(value, digits = 2) {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
        return '$0.00';
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
}

export function formatPercentage(value, digits = 2) {
    if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
        return '0.00%';
    }
    return `${value.toFixed(digits)}%`;
}