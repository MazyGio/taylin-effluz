const calculadoraUtilidad_en = {
    mainTitle: "Profit Calculator After Commissions",
    subtitle1: "Developed by Taylin Luzcando",
    subtitle2_line1: "Calculate your real profitability when selling on online platforms,",
    subtitle2_line2: "using payment gateways and salespeople (USD$)",
    languageToggle: "Español",
    calculator: {
        title: "Calculator Inputs",
        inputs: {
            productCost: "Product Cost",
            sellingPrice: "Selling Price",
            expectedMargin: "Current Sales Margin (%)",
            paymentCommissionPercentage: "Payment Method Commission (%)",
            paymentCommissionFixed: "Fixed Payment Method Commission ($)",
            websiteCommissionPercentage: "Website Commission (%)",
            sellerCommissionPercentage: "Salesperson Commission (%)",
            otherCommissions: "Other Commissions ($)",
            taxRate: "Tax Rate (%)",
            taxIncludedQuestion: "Does the selling price already include tax?",
            taxIncludedYes: "Yes",
            taxIncludedNo: "No",
        },
        outputs: {
            resultsTitle: "Results",
            sellingPricePreTax: "Selling Price (pre-tax)",
            taxAmount: "Tax Amount",
            sellingPriceWithTax: "Final Selling Price (with tax)",

            scenarioWithoutCommissions: "Analysis Without Commissions",
            expectedProfit: "Current Profit (pre-commissions)",
            expectedMargin: "Current Margin (pre-commissions)",

            commissionBreakdownTitle: "Commission Breakdown",
            paymentCommissionAmount: "Payment Method Commission (%)",
            paymentCommissionFixedAmount: "Fixed Payment Method Commission ($)",
            websiteCommissionAmount: "Website Commission (%)",
            sellerCommissionAmount: "Salesperson Commission (%)",
            otherCommissionsAmount: "Other Commissions ($)",
            totalCommissions: "Total Commissions",

            scenarioWithCommissions: "Analysis With Commissions",
            profit: "Final Profit",
            profitMargin: "Final Profit Margin (%)",

            variationAnalysis: "Variation Analysis",
            variationAnalysisText: "Sales commissions reduce your profit by <strong style='color:#4f0839'>{profitDifference}</strong>, which represents a decrease of <strong style='color:#4f0839'>{marginDifference}</strong> in your profit margin.",
        },
        autoCalculateMarginLabel: "I don't know my margin",
        inputGuidance: "If a value doesn't apply, enter 0.",
        mandatoryChoiceGuidance: "Select a tax option.",
        resultsPlaceholder: "Enter the values and click Calculate."
    },
    footer: {
        disclaimer: "The development of this calculator and its code are the property of Effluz S.A. Total or partial reproduction is prohibited. This calculator is an estimation tool; we are not responsible for the uses given to these calculations.",
        conceptsTitle: "Key Concepts",
        formulasTitle: "Formulas Used",
        showConcepts: "Show Concepts",
        hideConcepts: "Hide Concepts",
        showFormulas: "Show Formulas",
        hideFormulas: "Hide Formulas",
        concepts: {
            productCost: "Product Cost: The total monetary value to acquire or produce one unit of the product.",
            expectedProfit: "Current Profit (pre-commissions): The profit that was expected to be obtained based solely on the selling price and cost, before deducting any commissions.",
            finalProfit: "Final Profit: The actual net gain remaining after subtracting the product cost and all commissions from the selling price (pre-tax).",
            profitDifference: "Profit Difference: The exact amount of money that commissions reduce from your expected profit. It's the real cost of using the platform.",
            marginDifference: "Margin Difference: How many percentage points of profit margin you lose due to commissions. It shows the direct impact on your profitability.",
        },
        formulas: {
            expectedProfit: "<strong>Current Profit (pre-commissions)</strong> = Selling Price (pre-tax) - Product Cost",
            totalCommissions: "<strong>Total Commissions</strong> = (Payment Comm. %) + (Fixed Payment Comm.) + (Web Comm. %) + (Salesperson Comm. %) + (Other Comms.)",
            finalProfit: "<strong>Final Profit</strong> = Current Profit (pre-commissions) - Total Commissions",
            profitDifference: "<strong>Profit Difference</strong> = Current Profit (pre-commissions) - Final Profit",
            finalMargin: "<strong>Final Profit Margin (%)</strong> = (Final Profit / Selling Price (pre-tax)) * 100",
            marginDifference: "<strong>Margin Difference (%)</strong> = Current Sales Margin (%) - Final Profit Margin (%)",
        }
    }
};

export default calculadoraUtilidad_en;
