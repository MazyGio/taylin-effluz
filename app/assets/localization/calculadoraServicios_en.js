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
        taxRate: "Tax (e.g., VAT) (%)",
        includeISR: "Include estimated Income Tax (Panama)",
        includeCSS: "Include Social Security (IVM - Panama)",
        includeSalud: "Include voluntary Social Security affiliation (Health - Panama)",
    },
    calculateButton: "Calculate Rate",
    resultsTitle: "Monthly Detailed Results",
    results: {
        sectionTitleCosts: "Operating Costs",
        salaryAsCostExplanation: "Your salary is the most important cost. The business must be able to pay you and still be profitable.",
        sectionTitleNoTax: "Revenue & Profit (pre-tax)",
        sectionTitleWithTax: "Total Billing (with tax)",
        sectionTitleISR: "Estimated Income Tax (Annual)",
        sectionTitleCSS: "Estimated Social Security (Monthly)",
        cssExplanation: "This is the mandatory contribution for pension (IVM).",
        saludExplanation: "This is the voluntary contribution for Health and Maternity.",
        sectionTitleSuggested: "Final Suggested Prices (Rounded Up)",
  
        totalMonthlyCosts: { label: "Total Operating Costs", formula: "Salary + Fixed Costs + Variable Costs" },
        costPerHour: { label: "True Cost per Hour", subLabel: "based on", formula: "Total Operating Costs / Billable Hours" },
        
        preTaxRevenue: { label: "Required Revenue (Subtotal)", formula: "Operating Costs / (1 - % Profit Margin)" },
        requiredProfit: { label: "Net Business Profit", formula: "Required Revenue - Total Operating Costs" },
        pricePerHourNoTax: { label: "Price per Hour (pre-tax)", formula: "Required Revenue / Billable Hours" },
  
        taxAmount: { label: "Tax Amount (e.g., VAT)", formula: "Required Revenue * % Tax" },
        totalBilling: { label: "Total Revenue", formula: "Required Revenue + Tax Amount" },
        pricePerHourWithTax: { label: "Final Price per Hour (with tax)", formula: "Total Revenue / Billable Hours" },
        
        annualTaxableIncome: { label: "Annual Taxable Income", formula: "(Your Salary + Net Profit) * 12" },
        taxBracket: { label: "Tax Bracket", formula: "" },
        taxableSurplus: { label: "Taxable Surplus", formula: "Annual Taxable Income - Bracket Base" },
        estimatedISR: { label: "Annual Income Tax to Pay", subLabel: "(Estimated without deductions)", formula: "{formula}" },
        annualIncomeAfterISR: { label: "Final Net Annual Income", subLabel: "After ISR and Social Security", formula: "Taxable Income - ISR - Annual Social Security" },
  
        cssBaseIncome: { label: "Contribution Base Income (52%)", formula: "(Your Salary + Net Profit) * 52%" },
        cssPayment: { label: "Monthly Payment (Retirement)", subLabel: "Mandatory contribution for pension", formula: "Base Income * 9.36%" },
        
        saludBaseIncome: { label: "Contribution Base Income (Health)", formula: "Max($800.00, Monthly Income)" },
        saludPayment: { label: "Social Security Payment (Health)", subLabel: "Voluntary contribution for health", formula: "Base Income (Health) * 8.5%" },
        totalCssPayment: { label: "Total Social Security Payments", subLabel: "Sum of IVM and Health", formula: "IVM Payment + Health Payment" },
  
        roundedPriceNoTax: { label: "Suggested Price per Hour (pre-tax)" },
        roundedPriceWithTax: { 
            label: "Suggested Price per Hour (with tax)", 
            basePriceLabel: "To achieve this price, invoice a subtotal of:"
        },
        finalAnalysis: {
          title: "Results Analysis",
          p1: "Based on your {hours} billable hours per month, your suggested hourly rate of {priceWithTax} (tax included) is a guide to cover your financial needs.",
          p2: "This price allows you to cover {totalCosts} in monthly operating costs (which <strong>already include your salary</strong> of {salary}), and also generate a <strong>monthly net profit of {profit} for the business</strong>, which is separate from your salary.",
          p3: "<strong>Important:</strong> {cssText} {isrText} For an accurate declaration, it is essential to consult with a certified public accountant.",
          p4: "With this estimate, from a gross annual income of {annualGrossIncome}, {annualExpenses} in taxes and social security would be subtracted, resulting in a final net income of {annualNetIncome}."
        }
    },
    guidance: "Enter your data and click 'Calculate' to see the results.",
    error: "Please enter a valid number of hours (greater than 0).",
    footer: {
        disclaimer: "This calculator is an estimation tool. Consult with a financial professional for personalized advice.",
        conceptsTitle: "Key Concepts",
        formulasTitle: "Formulas Used",
        showConcepts: "Show Concepts",
        hideConcepts: "Hide Concepts",
        showFormulas: "Show Formulas",
        hideFormulas: "Hide Formulas",
        allConcepts: {
            desiredMonthlyIncome: "Desired Monthly Income: Your net salary. It's crucial to treat your salary as a business cost. This forces the business to be profitable on its own, beyond just paying you. It separates the business's financial health from your personal finances.",
            monthlyHours: "Billable Hours per Month: The total hours you plan to sell to clients. Exclude admin, sales, or training time.",
            fixedCosts: "Fixed Costs: Costs that don't change regardless of how much you work (e.g. rent, software subscriptions, internet, accounting).",
            variableCosts: "Variable Costs: Costs that change based on the volume of work (e.g. materials for a project, travel expenses, commissions).",
            profitMargin: "Desired Profit Margin: An additional percentage on your costs that you reinvest in the business for growth, savings, or bonuses. It's the real profit of the company and a strategic decision you define.",
            taxRate: "VAT/Sales Tax: A tax added to your service price, which you collect for the government.",
            costPerHour: "Cost per Hour: What it costs to operate your business each hour you bill. If you charge less than this, you lose money.",
            pricePerHourWithTax: "Final Price per Hour: The final rate you charge to clients to cover all costs, your profit, and the VAT."
        },
        allFormulas: {
            totalMonthlyCosts: "Total Operating Costs = Your Salary + Fixed Costs + Variable Costs",
            preTaxRevenue: "Revenue (Subtotal) = Operating Costs / (1 - (Profit Margin / 100))",
            taxAmount: "Tax Amount = Revenue (Subtotal) * (Tax Rate / 100)",
            totalBilling: "Total Billing = Revenue (Subtotal) + Tax Amount",
            pricePerHourNoTax: "Price per Hour (no tax) = Revenue (Subtotal) / Billable Hours",
            pricePerHourWithTax: "Price per Hour (with tax) = Total Billing / Billable Hours",
            pricePerHourHalfHours: "Price per Hour (half hours) = Total Billing / (Billable Hours / 2)",
        }
    }
};

export default calculadoraServicios_en;
