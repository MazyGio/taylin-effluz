const calculadoraServicios_en = {
    title: "Service Price Calculator",
    mainTitle: "Consulting Service Price Calculator",
    subtitle: "Define your hourly rate based on your goals and costs (USD$)",
    languageToggle: { es: "ES", en: "EN" },
    inputsTitle: "1. Define Your Monthly Goals & Costs",
    inputs: {
        desiredMonthlyIncome: "Your Desired Monthly Income (Net Salary)",
        monthlyHours: "Billable Hours per Month",
        fixedCosts: "Monthly Fixed Costs",
        variableCosts: "Monthly Variable Costs",
        profitMargin: "Desired Business Profit Margin (%)",
        taxRate: "VAT/Sales Tax (%)",
    },
    calculateButton: "Calculate Rate",
    resultsTitle: "Monthly Detailed Results",
    results: {
        costBreakdown: {
            title: "Operating Costs Breakdown",
            income: "Your Salary",
            fixed: "Fixed Costs",
            variable: "Variable Costs"
        },
        totalMonthlyCosts: { label: "Total Operating Costs", subLabel: "Your Salary + Expenses", formula: "Salary + Fixed + Variable" },
        costPerHour: { label: "True Cost per Hour", subLabel: "based on", formula: "Total Costs / Hours" },
        requiredProfit: { label: "Net Business Profit", subLabel: "Margin for growth", formula: "Revenue - Total Costs" },
        preTaxRevenue: { label: "Revenue (Subtotal)", subLabel: "Before Tax", formula: "Costs / (1 - % Margin)" },
        taxAmount: { label: "Tax Amount", subLabel: "Tax on services", formula: "Subtotal * % Tax" },
        totalBilling: { label: "Total Billing", subLabel: "Including Tax", formula: "Subtotal + Tax" },
        pricePerHourNoTax: { label: "PRICE PER HOUR", subLabel: "Subtotal (pre-tax)", formula: "Subtotal / Hours" },
        pricePerHourWithTax: { label: "FINAL PRICE PER HOUR", subLabel: "Client-facing rate (tax included)", formula: "Total Bill / Hours" },
        pricePerHourHalfHours: { label: "PRICE IF BILLING HALF HOURS", subLabel: "Risk scenario", formula: "Total Bill / (Hours / 2)" },
        roundedPrices: {
            label: "SUGGESTED PRICES (ROUNDED UP)",
            subLabel: "To quote clients",
            withTax: "With Tax",
            noTax: "No Tax",
        },
    },
    guidance: "Enter your data and click 'Calculate' to see the results.",
    error: "Please enter a valid number of hours (greater than 0).",
    footer: {
        disclaimer: "This calculator is an estimation tool. Consult with a financial professional for personalized advice.",
        conceptsTitle: "Key Concepts",
        formulasTitle: "Formulas Used",
        allConcepts: {
            desiredMonthlyIncome: "<strong>Desired Monthly Income:</strong> Your net salary. <strong>It's crucial to treat your salary as a business cost.</strong> This forces the business to be profitable on its own, beyond just paying you. It separates the business's financial health from your personal finances.",
            monthlyHours: "<strong>Billable Hours per Month:</strong> The total hours you plan to sell to clients. Exclude admin, sales, or training time.",
            fixedCosts: "<strong>Fixed Costs:</strong> Costs that don't change regardless of how much you work (e.g. rent, software subscriptions, internet, accounting).",
            variableCosts: "<strong>Variable Costs:</strong> Costs that change based on the volume of work (e.g. materials for a project, travel expenses, commissions).",
            profitMargin: "<strong>Desired Profit Margin:</strong> An additional percentage on your costs that you reinvest in the business for growth, savings, or bonuses. It's the real profit of the company and a strategic decision you define.",
            taxRate: "<strong>VAT/Sales Tax:</strong> A tax added to your service price, which you collect for the government.",
            costPerHour: "<strong>Cost per Hour:</strong> What it costs to operate your business each hour you bill. If you charge less than this, you lose money.",
            pricePerHourWithTax: "<strong>Final Price per Hour:</strong> The final rate you charge to clients to cover all costs, your profit, and the VAT."
        },
        allFormulas: {
            totalMonthlyCosts: "<strong>Total Operating Costs</strong> = Your Salary + Fixed Costs + Variable Costs",
            preTaxRevenue: "<strong>Revenue (Subtotal)</strong> = Operating Costs / (1 - (Profit Margin / 100))",
        }
    }
};

export default calculadoraServicios_en;
