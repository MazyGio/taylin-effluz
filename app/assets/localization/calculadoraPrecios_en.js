const calculadoraPrecios_en = {
    mainTitle: "Business Calculator",
    subtitle1: "Developed by Taylin Luzcando",
    subtitle2: "Calculator for Cost, Price, Margin, and Markup for your business (USD$)",
    languageToggle: "Español",
    tab0: { // New Tab for Product Cost
        title: "Product Cost Calculation",
        inputs: {
            directMaterials: "Direct Materials Cost",
            directLabor: "Direct Labor Cost",
            manufacturingOverhead: "Manufacturing Overhead Costs",
            otherCosts: "Other Costs",
            transportation: "Transportation",
            quantity: "Quantity of products manufactured",
            costTypeQuestion: "Are the entered costs per unit or for the total order?",
            costTypePerUnit: "Per unit",
            costTypeTotalOrder: "Total for the order",
        },
        outputs: {
            directMaterials: "Direct Materials Cost",
            directLabor: "Direct Labor Cost",
            manufacturingOverhead: "Manufacturing Overhead Costs",
            otherCosts: "Other Costs",
            transportation: "Transportation",
            totalProductCost: "Total Product Cost (per unit)",
            overallTotalCost: "Overall Total Cost",
            perUnitCost: "Total Product Cost (per unit)",
            totalOrderCost: "Overall Total Cost",
        },
        inputGuidance: "If a value doesn't apply, enter 0.",
        mandatoryChoiceGuidance: "Select a cost type option."
    },
    tab1: {
        title: "Calculate Price based on Cost",
        inputs: {
            cost: "Cost",
            desiredMargin: "Desired Margin (%)",
            taxRate: "Tax Rate (%)", // New input
        },
        outputs: {
            cost: "Cost",
            profitMargin: "Profit Margin",
            suggestedSellingPrice: "Suggested Selling Price (pre-tax)", // Clarified
            taxAmount: "Tax Amount", // New output
            suggestedSellingPriceWithTax: "Suggested Selling Price (with tax)", // New output
            markup: "Markup",
            profitPerUnit: "Profit per Unit",
        },
        inputGuidance: "If a value doesn't apply, enter 0."
    },
    tab2: {
        title: "Calculate Margin and Markup",
        inputs: {
            cost: "Cost",
            desiredSellingPrice: "Desired Selling Price",
            taxRate: "Tax Rate (%)", // Added tax rate to tab2 inputs
            taxIncludedQuestion: "Does desired selling price include tax?", // New
            taxIncludedYes: "Yes, includes tax", // New
            taxIncludedNo: "No, does not include tax", // New
        },
        outputs: {
            cost: "Cost",
            desiredSellingPricePreTax: "Desired Selling Price (pre-tax)", // New output
            taxAmount: "Tax Amount", // Adjusted capitalization
            desiredSellingPriceWithTax: "Desired Selling Price (with tax)", // New output
            profitMargin: "Profit Margin (%)",
            markup: "Markup (%)",
            profitPerUnit: "Profit per Unit",
        },
        inputGuidance: "If a value doesn't apply, enter 0.",
        mandatoryChoiceGuidance: "Select a tax option." // New guidance
    },
    tab3: { // Old tab4, now tab3
        title: "Price Calculation with Double Margin", // Updated title
        section1: {
            title: "ADJUSTED MARGIN",
            inputs: {
                cost: "Cost",
                suggestedRetailPrice: "Suggested Retail Price",
                wholesalerDesiredMargin: "Wholesaler's Desired Margin (%)",
                taxRate: "Tax Rate (%)", // New input for section1
            },
            outputs: {
                directSales: "Direct Sales",
                suggestedRetailPrice: "Suggested Retail Price (pre-tax)", // Clarified
                taxAmount: "Tax Amount", // New output
                suggestedRetailPriceWithTax: "Suggested Retail Price (with tax)", // New output
                cost: "Cost",
                grossMargin: "Gross Margin (%)",
                profit: "Profit",
                adjustedWholesaleSales: "Sales Adjusted for Wholesaler",
                priceToWholesaler: "Price to Wholesaler",
                wholesalerMargin: "Wholesaler's Margin (%)",
                sellerAdjustedMargin: "Seller's Adjusted Margin (%)",
                sellerProfit: "Seller's Profit",
            },
            inputGuidance: "If a value doesn't apply, enter 0."
        },
        section2: {
            title: "DESIRED MARGIN",
            inputs: {
                cost: "Cost",
                desiredMargin: "Desired Margin (Seller) (%)",
                wholesalerDesiredMargin: "Wholesaler's Desired Margin (%)",
                taxRate: "Tax Rate (%)", // New input for section2
            },
            outputs: {
                cost: "Cost",
                desiredMargin: "Desired Margin (Seller)",
                wholesalerDesiredMargin: "Wholesaler's Desired Margin",
                priceToWholesaler: "Price to Wholesaler",
                suggestedPublicSellingPrice: "Suggested Public Selling Price (pre-tax)", // Clarified
                taxAmount: "Tax Amount", // New output
                suggestedPublicSellingPriceWithTax: "Suggested Public Selling Price (with tax)", // New output
                yourProfit: "Your Profit",
                wholesalerProfit: "Wholesaler's Profit",
            },
            inputGuidance: "If a value doesn't apply, enter 0."
        }
    },
    footer: {
        disclaimer: "The development of this calculator and its code are property of Effluz S.A. Total or partial reproduction is prohibited.", // Combined disclaimer
        allConcepts: { // Consolidated concepts
            cost: "Cost: The monetary value of resources used to produce something or acquire a product.",
            directMaterials: "Direct Materials Cost: The cost of raw materials that are directly converted into the final product (e.g., wood for furniture).", // Adjusted capitalization
            directLabor: "Direct Labor Cost: The cost of labor directly involved in manufacturing the product (e.g., assembler's salary).", // Adjusted capitalization
            manufacturingOverhead: "Manufacturing Overhead Costs: All manufacturing costs that are not direct materials or direct labor (e.g., factory rent, utilities, machinery depreciation).", // Adjusted capitalization
            otherCosts: "Other Costs: Any other costs directly associated with product production or acquisition not fitting previous categories (e.g., special packaging, per-unit licenses).", // Adjusted capitalization
            transportation: "Transportation: Costs incurred to move materials or products, either for receiving inputs (inbound freight) or for shipping finished products (outbound freight).",
            quantity: "Quantity: The total number of units of a product that are manufactured or considered in the calculation.", // New concept for quantity
            totalProductCost: "Total Product Cost (per unit): The sum of all direct and indirect costs associated with producing one unit of product. It represents the complete cost to manufacture an item.", // Adjusted capitalization
            overallTotalCost: "Overall Total Cost: The total cost for a specific number of product units. It is calculated by multiplying the Total Product Cost (per unit) by the Quantity.", // Adjusted capitalization
            profitMargin: "Profit Margin (Margin): It's the percentage of profit obtained over the selling price. It indicates how much profit is generated for every dollar of sale. Calculated as (Profit / Selling Price) * 100.", // Adjusted capitalization
            markup: "Markup: It's the percentage added to the cost of a product to determine its selling price. It indicates how much the cost is increased to reach the selling price. Calculated as ((Selling Price - Cost) / Cost) * 100.",
            profit: "Profit (Gain): The *gross monetary gain per unit* obtained from a sale or transaction, before considering general operating expenses. Calculated as Selling Price - Cost.",
            suggestedSellingPrice: "Suggested Selling Price: The recommended price at which a product should be sold to achieve a desired margin, before applying taxes. It is derived from the cost and the target margin.", // Adjusted capitalization
            taxRate: "Tax Rate (%): The percentage of tax applied to the product's selling price in a specific country or region.",
            taxAmount: "Tax Amount: The monetary amount of tax calculated on the selling price. Calculated as Suggested Selling Price * (Tax Rate / 100).", // Adjusted capitalization
            suggestedSellingPriceWithTax: "Suggested Selling Price (with tax): The final recommended price at which a product should be sold, including the applicable tax. Calculated as Suggested Selling Price (pre-tax) + Tax Amount.", // Adjusted capitalization
            priceToWholesaler: "Wholesale Price: The price at which my business sells its products to a distributor or wholesaler. It is the revenue for my business and the cost for the wholesaler.", // Adjusted capitalization
            wholesalerCost: "Wholesaler Cost: The acquisition cost of the product for the wholesaler, which is equal to the Wholesale Price set by my business.", // Adjusted capitalization
            wholesalerMargin: "Wholesaler Margin: The percentage of profit the wholesaler seeks to obtain over their retail selling price. It is their own profit margin.", // Adjusted capitalization
            suggestedFinalSellingPrice: "Suggested Final Selling Price (Public Selling Price): The recommended price at which the wholesaler should sell the product to the end consumer, considering their own desired margin.", // Adjusted capitalization
            directSales: "Direct Sales: Refers to margin and profit calculations when my business sells directly to the end consumer, without intermediaries.", // Adjusted capitalization
            adjustedWholesaleSales: "Sales adjusted for wholesaler: Margin and profit calculations that reflect how my business's profits are adjusted when selling to a wholesaler, while maintaining a fixed public selling price.", // Adjusted capitalization
            grossMargin: "Gross Margin: The difference between sales revenue and the cost of goods sold (Product Cost), expressed as a percentage. It is a measure of sales profitability before operating expenses.", // Adjusted capitalization
            sellerAdjustedMargin: "My Business's Adjusted Margin: Your profit margin after considering the margin the wholesaler needs or wants to obtain. It is your actual margin when selling through a wholesaler.", // Adjusted capitalization
            discountRate: "Discount Rate (%): The percentage of reduction applied to the selling price of a product.", // New concept
            discountAmount: "Discount Amount: The monetary amount of the reduction applied to the selling price. Calculated as Suggested Selling Price * (Discount / 100).", // New concept
            sellingPriceAfterDiscountPreTax: "Suggested Selling Price (with discount, pre-tax): The price of the product after applying a discount, before taxes.", // New concept
            sellingPriceAfterDiscountWithTax: "Suggested Selling Price (with discount, with tax): The final price of the product after applying a discount and adding taxes.", // New concept
            profitMarginAfterDiscount: "Profit Margin (with discount): The profit margin calculated after applying a discount to the selling price. Calculated as (Profit with Discount / Selling Price with Discount) * 100.", // New concept
        },
        allFormulas: { // Consolidated formulas
            tab0: {
                title: "Formulas for Product Cost Calculation",
                formula: "<strong>Total Product Cost (per unit)</strong> = Direct Materials Cost + Direct Labor Cost + Manufacturing Overhead Costs + Other Costs + Transportation",
                overallTotalCostFormula: "<strong>Overall Total Cost</strong> = Total Product Cost (per unit) * Quantity"
            },
            tab1: {
                title: "Formulas for Price Calculation based on Cost",
                profit: "<strong>Profit</strong> = Suggested Selling Price (pre-tax) - Cost",
                suggestedSellingPrice: "<strong>Suggested Selling Price (pre-tax)</strong> = Cost / (1 - (Desired Margin / 100))",
                taxAmount: "<strong>Tax Amount</strong> = Suggested Selling Price (pre-tax) * (Tax Rate / 100)",
                suggestedSellingPriceWithTax: "<strong>Suggested Selling Price (with tax)</strong> = Suggested Selling Price (pre-tax) + Tax Amount",
                markup: "<strong>Markup</strong> = ((Suggested Selling Price (pre-tax) - Cost) / Cost) * 100",
                profitMargin: "<strong>Profit Margin</strong> = ((Suggested Selling Price (pre-tax) - Cost) / Suggested Selling Price (pre-tax)) * 100"
            },
            tab2: {
                title: "Fórmulas para Cálculo de Margen y Markup",
                profit: "<strong>Utilidad</strong> = Precio de Venta Deseado (sin impuesto) - Costo", // Clarified
                profitMargin: "<strong>Margen de Utilidad (%)</strong> = ((Precio de Venta Deseado (sin impuesto) - Costo) / Precio de Venta Deseado (sin impuesto)) * 100", // Clarified
                markup: "<strong>Markup (%)</strong> = ((Precio de Venta Deseado (sin impuesto) - Costo) / Costo) * 100", // Clarified
                taxAmount: "<strong>Monto de Impuesto</strong> = Precio de Venta Deseado (sin impuesto) * (Impuesto / 100)", // New formula
                suggestedSellingPriceWithTax: "<strong>Precio de Venta Deseado (con impuesto)</strong> = Precio de Venta Deseado (sin impuesto) + Monto de Impuesto", // New formula
                derivedPreTaxPrice: "<em>Si el precio de venta deseado incluye impuesto:</em> <strong>Precio de Venta Deseado (sin impuesto)</strong> = Precio de Venta Deseado (ingresado) / (1 + Impuesto / 100)", // New formula explanation
                derivedPreTaxPriceNoTax: "<em>Si el precio de venta deseado NO incluye impuesto:</em> <strong>Precio de Venta Deseado (sin impuesto)</strong> = Precio de Venta Deseado (ingresado)", // New formula explanation
            },
            tab3_section1: { // Formulas for Adjusted Margin part of tab4 (now tab3)
                title: "Fórmulas para Margen Ajustado (Cálculo de Doble Márgenes)",
                derivedPreTaxPrice: "<em>Si el precio de venta al público incluye impuesto:</em> <strong>Precio de Venta al Público (sin impuesto)</strong> = Precio de Venta al Público (ingresado) / (1 + Impuesto / 100)", // New formula explanation
                derivedPreTaxPriceNoTax: "<em>Si el precio de venta al público NO incluye impuesto:</em> <strong>Precio de Venta al Público (sin impuesto)</strong> = Precio de Venta al Público (ingresado)", // New formula explanation
                priceToWholesaler: "<strong>Precio al Mayorista</strong> = Precio de Venta al Público (sin impuesto) * (1 - (Margen del Mayorista Deseado / 100))", // Clarified
                sellerAdjustedMargin: "<strong>Margen de mi Negocio Ajustado</strong> = ((Precio al Mayorista - Costo) / Precio al Mayorista) * 100",
                sellerProfit: "<strong>Utilidad de mi Negocio</strong> = Precio al Mayorista - Costo",
                taxAmount: "<strong>Monto de Impuesto</strong> = Precio de Venta al Público (sin impuesto) * (Impuesto / 100)", // New formula
                suggestedRetailPriceWithTax: "<strong>Precio de Venta al Público (con impuesto)</strong> = Precio de Venta al Público (sin impuesto) + Monto de Impuesto", // New formula
            },
            tab3_section2: { // Formulas for Desired Margin part of tab4 (now tab3)
                title: "Fórmulas para Margen Deseado (Cálculo de Doble Márgenes)",
                priceToWholesaler: "<strong>Precio al Mayorista</strong> = Costo / (1 - (Margen Deseado (Mi negocio) / 100))",
                suggestedPublicSellingPrice: "<strong>Precio de Venta al Público Sugerido (sin impuesto)</strong> = Precio al Mayorista / (1 - (Margen Deseado del Mayorista / 100))", // Clarified
                taxAmount: "<strong>Monto de Impuesto</strong> = Precio de Venta al Público Sugerido (sin impuesto) * (Impuesto / 100)", // New formula
                suggestedPublicSellingPriceWithTax: "<strong>Precio de Venta al Público Sugerido (con impuesto)</strong> = Precio de Venta al Público Sugerido (sin impuesto) + Monto de Impuesto", // New formula
                yourProfit: "<strong>Utilidad de mi Negocio</strong> = Precio al Mayorista - Costo",
                wholesalerProfit: "<strong>Utilidad del Mayorista</strong> = Precio de Venta al Público Sugerido (sin impuesto) - Precio al Mayorista" // Clarified
            }
        }
    }
};

export default calculadoraPrecios_en;
