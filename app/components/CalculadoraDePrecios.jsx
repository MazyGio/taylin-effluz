import { useState } from 'react';

// Define brand colors
const brandColors = {
  primary: '#4f0839',
  secondary: '#a66d72',
  accent1: '#c69399',
  accent2: '#e0c6cb',
  lightGray1: '#f2f2f2',
  lightGray2: '#f2ece7',
  lightGray3: '#e7dcd0',
  blue1: '#a9c0d9',
  blue2: '#5b8098',
  darkBlue: '#1e374f',
  green1: '#b1b599',
  green2: '#787a64',
  darkGreen: '#3a3d30',
  white: '#FFFFFF',
};

// Translations object
const translations = {
  es: {
    mainTitle: "Calculadora para Negocios",
    subtitle1: "Desarrollado por Taylin Luzcando",
    subtitle2: "Calculadora para costo, precio, margen y markup para tu negocio (USD$)",
    languageToggle: "English",
    tab0: { // New Tab for Product Cost
      title: "Cálculo de Costo de Producto",
      inputs: {
        directMaterials: "Costo de Materiales Directos",
        directLabor: "Costo de Mano de Obra Directa",
        manufacturingOverhead: "Costos Indirectos de Fabricación",
        otherCosts: "Otros Costos",
        transportation: "Transporte",
        quantity: "Cantidad de productos que fabrique",
      },
      outputs: {
        directMaterials: "Costo de Materiales Directos",
        directLabor: "Costo de Mano de Obra Directa",
        manufacturingOverhead: "Costos Indirectos de Fabricación",
        otherCosts: "Otros Costos",
        transportation: "Transporte",
        totalProductCost: "Costo total del producto (por unidad)", // Adjusted capitalization
        overallTotalCost: "Costo total general", // Adjusted capitalization
      },
      inputGuidance: "Si algún dato no aplica, coloca 0."
    },
    tab1: {
      title: "Cálculo de Precio en base a costo",
      inputs: {
        cost: "Costo",
        desiredMargin: "Margen Deseado (%)",
        taxRate: "Impuesto (%)", // New input
      },
      outputs: {
        cost: "Costo",
        profitMargin: "Margen de utilidad", // Adjusted capitalization
        suggestedSellingPrice: "Precio de venta sugerido (sin impuesto)", // Adjusted capitalization
        taxAmount: "Monto de impuesto", // Adjusted capitalization
        suggestedSellingPriceWithTax: "Precio de venta sugerido (con impuesto)", // Adjusted capitalization
        markup: "Markup",
        profitPerUnit: "Utilidad por unidad", // Adjusted capitalization
      },
      inputGuidance: "Si algún dato no aplica, coloca 0."
    },
    tab2: {
      title: "Cálculo de Margen y Markup",
      inputs: {
        cost: "Costo",
        desiredSellingPrice: "Precio de Venta Deseado",
        taxRate: "Impuesto (%)", // Added tax rate to tab2 inputs
        taxIncludedQuestion: "¿El precio de venta deseado incluye impuesto?", // New
        taxIncludedYes: "Sí, incluye impuesto", // New
        taxIncludedNo: "No, no incluye impuesto", // New
      },
      outputs: {
        cost: "Costo",
        desiredSellingPricePreTax: "Precio de venta deseado (sin impuesto)", // New output
        taxAmount: "Monto de impuesto", // Adjusted capitalization
        desiredSellingPriceWithTax: "Precio de venta deseado (con impuesto)", // New output
        profitMargin: "Margen de utilidad (%)", // Adjusted capitalization
        markup: "Markup (%)",
        profitPerUnit: "Utilidad por unidad", // Adjusted capitalization
      },
      inputGuidance: "Si algún dato no aplica, coloca 0.",
      mandatoryChoiceGuidance: "Selecciona una opción para el impuesto." // New guidance
    },
    tab3: { // Old tab4, now tab3
      title: "Cálculo de Precio con Doble Margen", // Updated title
      section1: {
        title: "MARGEN AJUSTADO",
        inputs: { // Inputs specific to this section
          cost: "Costo",
          suggestedRetailPrice: "Precio de Venta al Público",
          wholesalerDesiredMargin: "Margen del Mayorista Deseado (%)",
          taxRate: "Impuesto (%)", // New input for section1
          taxIncludedQuestion: "¿El precio de venta al público incluye impuesto?", // New
          taxIncludedYes: "Sí, incluye impuesto", // New
          taxIncludedNo: "No, no incluye impuesto", // New
        },
        outputs: { // Outputs specific to this section
          directSales: "Ventas directas", // Adjusted capitalization
          suggestedRetailPrice: "Precio de venta al público (sin impuesto)", // Adjusted capitalization
          taxAmount: "Monto de impuesto", // Adjusted capitalization
          suggestedRetailPriceWithTax: "Precio de venta al público (con impuesto)", // Adjusted capitalization
          cost: "Costo",
          grossMargin: "Margen bruto (%)", // Adjusted capitalization
          profit: "Utilidad",
          adjustedWholesaleSales: "Ventas ajustado a mayorista", // Adjusted capitalization
          priceToWholesaler: "Precio al mayorista", // Adjusted capitalization
          wholesalerMargin: "Margen del mayorista (%)", // Adjusted capitalization
          sellerAdjustedMargin: "Margen de mi negocio ajustado (%)", // Adjusted capitalization
          sellerProfit: "Utilidad de mi negocio", // Adjusted capitalization
        },
        inputGuidance: "Si algún dato no aplica, coloca 0.",
        mandatoryChoiceGuidance: "Selecciona una opción para el impuesto." // New guidance
      },
      section2: {
        title: "MARGEN DESEADO",
        inputs: { // Inputs specific to this section
          cost: "Costo",
          desiredMargin: "Margen Deseado (Mi negocio) (%)",
          wholesalerDesiredMargin: "Margen Deseado del Mayorista (%)",
          taxRate: "Impuesto (%)", // New input for section2
          taxIncludedQuestion: "¿El precio de venta al público sugerido incluye impuesto?", // New
          taxIncludedYes: "Sí, incluye impuesto", // New
          taxIncludedNo: "No, no incluye impuesto", // New
        },
        outputs: { // Outputs specific to this section
          cost: "Costo",
          desiredMargin: "Margen deseado (Mi negocio)", // Adjusted capitalization
          wholesalerDesiredMargin: "Margen deseado del mayorista", // Adjusted capitalization
          priceToWholesaler: "Precio al mayorista", // Adjusted capitalization
          suggestedPublicSellingPrice: "Precio de venta al público sugerido (sin impuesto)", // Adjusted capitalization
          taxAmount: "Monto de impuesto", // Adjusted capitalization
          suggestedPublicSellingPriceWithTax: "Precio de venta al público sugerido (con impuesto)", // Adjusted capitalization
          yourProfit: "Utilidad de mi negocio", // Adjusted capitalization
          wholesalerProfit: "Utilidad del mayorista", // Adjusted capitalization
        },
        inputGuidance: "Si algún dato no aplica, coloca 0.",
        mandatoryChoiceGuidance: "Selecciona una opción para el impuesto." // New guidance
      }
    },
    footer: {
      disclaimer: "El desarrollo de esta calculadora y su código son propiedad de Effluz S.A. Está prohibida su reproducción total o parcial.", // Combined disclaimer with accent
      allConcepts: { // Consolidated concepts
        cost: "Costo: El valor monetario de los recursos utilizados para producir algo o adquirir un producto.",
        directMaterials: "Costo de materiales directos: El costo de las materias primas que se convierten directamente en el producto final (ej. madera para un mueble).", // Adjusted capitalization
        directLabor: "Costo de mano de obra directa: El costo de la mano de obra directamente involucrada en la fabricación del producto (ej. salario de un ensamblador).", // Adjusted capitalization
        manufacturingOverhead: "Costos indirectos de fabricación: Todos los costos de fabricación que no son materiales directos ni mano de obra directa (ej. alquiler de fábrica, servicios públicos, depreciación de maquinaria).", // Adjusted capitalization
        otherCosts: "Otros costos: Cualquier otro costo asociado directamente con la producción o adquisición del producto que no encaja en las categorías anteriores (ej. empaque especial, licencias por unidad).", // Adjusted capitalization
        transportation: "Transporte: Costos incurridos para mover materiales o productos, ya sea para recibir insumos (flete de entrada) o para enviar productos terminados (flete de salida).",
        totalProductCost: "Costo total del producto (por unidad): La suma de todos los costos directos e indirectos asociados con la producción de una unidad de producto. Representa el costo completo de fabricar un artículo.", // Adjusted capitalization
        overallTotalCost: "Costo total general: El costo total de un número específico de unidades del producto. Se calcula multiplicando el Costo Total del Producto (por unidad) por la Cantidad.", // Adjusted capitalization
        profitMargin: "Margen de utilidad (Margen): Es el porcentaje de utilidad que se obtiene sobre el precio de venta. Indica cuánto beneficio se genera por cada dólar de venta. Se calcula como (Utilidad / Precio de Venta) * 100.", // Adjusted capitalization
        markup: "Markup: Es el porcentaje que se le añade al costo de un producto para determinar su precio de venta. Indica cuánto se incrementa el costo para llegar al precio de venta. Se calcula como ((Precio de Venta - Costo) / Costo) * 100.",
        profit: "Utilidad (Ganancia): Es la ganancia monetaria *bruta por unidad* obtenida de una venta o transacción, antes de considerar gastos operativos generales. Se calcula como Precio de Venta - Costo.",
        suggestedSellingPrice: "Precio de venta sugerido (sin impuesto): El precio recomendado al que se debería vender un producto para alcanzar un margen deseado, antes de aplicar impuestos. Se deriva del costo y el margen objetivo.", // Adjusted capitalization
        taxRate: "Impuesto (%): El porcentaje de impuesto que se aplica al precio de venta del producto en un país o región específica.",
        taxAmount: "Monto de impuesto: La cantidad monetaria del impuesto calculado sobre el precio de venta. Se calcula como Precio de Venta Sugerido * (Impuesto / 100).", // Adjusted capitalization
        suggestedSellingPriceWithTax: "Precio de venta sugerido (con impuesto): El precio final recomendado al que se debería vender un producto, incluyendo el impuesto aplicable. Se calcula como Precio de Venta Sugerido (sin impuesto) + Monto de Impuesto.", // Adjusted capitalization
        priceToWholesaler: "Precio mayorista: El precio al que mi negocio vende sus productos a un distribuidor o mayorista. Es el ingreso para mi negocio y el costo para el mayorista.", // Adjusted capitalization
        wholesalerCost: "Costo mayorista: El costo de adquisición del producto para el mayorista, que es igual al Precio Mayorista fijado por mi negocio.", // Adjusted capitalization
        wholesalerMargin: "Margen mayorista: El porcentaje de ganancia que el mayorista busca obtener sobre su precio de venta al público. Es su propio margen de beneficio.", // Adjusted capitalization
        suggestedFinalSellingPrice: "Precio de venta sugerido final (Precio de Venta al Público): El precio recomendado al que el mayorista debería vender el producto al consumidor final, considerando su propio margen deseado.", // Adjusted capitalization
        directSales: "Ventas directas: Se refiere a los cálculos de margen y utilidad cuando mi negocio vende directamente al consumidor final, sin intermediarios.", // Adjusted capitalization
        adjustedWholesaleSales: "Ventas ajustado a mayorista: Cálculos de margen y utilidad que reflejan cómo se ajustan los beneficios de mi negocio cuando se vende a un mayorista, manteniendo un precio de venta al público fijo.", // Adjusted capitalization
        grossMargin: "Margen bruto: La diferencia entre los ingresos por ventas y el costo de los bienes vendidos (Costo del Producto), expresada como porcentaje. Es una medida de la rentabilidad de las ventas antes de los gastos operativos.", // Adjusted capitalization
        sellerAdjustedMargin: "Margen de mi negocio ajustado: Tu margen de ganancia después de considerar el margen que el mayorista necesita o desea obtener. Es tu margen real cuando vendes a través de un mayorista.", // Adjusted capitalization
      },
      allFormulas: { // Consolidated formulas
        tab0: {
          title: "Fórmulas para Cálculo de Costo de Producto",
          formula: "<strong>Costo Total del Producto (por unidad)</strong> = Costo de Materiales Directos + Costo de Mano de Obra Directa + Costos Indirectos de Fabricación + Otros Costos + Transporte",
          overallTotalCostFormula: "<strong>Costo Total General</strong> = Costo Total del Producto (por unidad) * Cantidad"
        },
        tab1: {
          title: "Fórmulas para Cálculo de Precio en base a Costo",
          profit: "<strong>Utilidad</strong> = Precio de Venta Sugerido (sin impuesto) - Costo",
          suggestedSellingPrice: "<strong>Precio de Venta Sugerido (sin impuesto)</strong> = Costo / (1 - (Margen Deseado / 100))",
          taxAmount: "<strong>Monto de Impuesto</strong> = Precio de Venta Sugerido (sin impuesto) * (Impuesto / 100)",
          suggestedSellingPriceWithTax: "<strong>Precio de Venta Sugerido (con impuesto)</strong> = Precio de Venta Sugerido (sin impuesto) + Monto de Impuesto",
          markup: "<strong>Markup</strong> = ((Precio de Venta Sugerido (sin impuesto) - Costo) / Costo) * 100",
          profitMargin: "<strong>Margen de Utilidad</strong> = ((Precio de Venta Sugerido (sin impuesto) - Costo) / Precio de Venta Sugerido (sin impuesto)) * 100"
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
  },
  en: {
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
      },
      outputs: {
        directMaterials: "Direct Materials Cost",
        directLabor: "Direct Labor Cost",
        manufacturingOverhead: "Manufacturing Overhead Costs",
        otherCosts: "Other Costs",
        transportation: "Transportation",
        totalProductCost: "Total Product Cost (per unit)",
        overallTotalCost: "Overall Total Cost",
      },
      inputGuidance: "If a value doesn't apply, enter 0."
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
        totalProductCost: "Total Product Cost (per unit): The sum of all direct and indirect costs associated with producing one unit of product. It represents the complete cost to manufacture an item.", // Adjusted capitalization
        overallTotalCost: "Overall Total Cost: The total cost for a specific number of product units. It is calculated by multiplying the Total Product Cost (per unit) by the Quantity.", // Adjusted capitalization
        profitMargin: "Profit Margin (Margin): It's the percentage of profit obtained over the selling price. It indicates how much profit is generated for every dollar of sale. Calculated as (Profit / Selling Price) * 100.", // Adjusted capitalization
        markup: "Markup: It's the percentage added to the cost of a product to determine its selling price. It indicates how much the cost is increased to reach the selling price. Calculated as ((Selling Price - Cost) / Cost) * 100.",
        profit: "Profit (Gain): The *gross monetary gain per unit* obtained from a sale or transaction, before considering general operating expenses. Calculated as Selling Price - Cost.",
        suggestedSellingPrice: "Suggested Selling Price (pre-tax): The recommended price at which a product should be sold to achieve a desired margin, before applying taxes. It is derived from the cost and the target margin.", // Adjusted capitalization
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
  }
};

// Helper function to format numbers to 2 decimal places
const formatCurrency = (value) => {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return '$0.00';
  }
  return `$${value.toFixed(2)}`;
};

const formatPercentage = (value) => {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return '0.00%';
  }
  return `${value.toFixed(2)}%`;
};

// Reusable Input Field Component
const InputField = ({ label, value, onChange, type = 'number', min = '0', step = '0.01', placeholder = '0' }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" style={{ color: brandColors.darkBlue }}>
      {label}:
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      min={min}
      step={step}
      placeholder={placeholder}
      style={{ borderColor: brandColors.accent1 }}
    />
  </div>
);

// Reusable Result Display Component
const ResultDisplay = ({ label, value, isHighlighted = false }) => (
  <div className={`flex justify-between items-center mb-2 ${isHighlighted ? 'text-base font-bold p-2 rounded-md' : 'text-sm'}`} style={{ color: isHighlighted ? brandColors.primary : brandColors.darkBlue, backgroundColor: isHighlighted ? brandColors.lightGray1 : 'transparent' }}>
    <span className="font-semibold">{label}:</span>
    <span className="text-right">{value}</span>
  </div>
);

// New Calculator Tab 0: Product Cost Calculation
const ProductCostCalculator = ({ language, t }) => {
  const [directMaterials, setDirectMaterials] = useState('');
  const [directLabor, setDirectLabor] = useState('');
  const [manufacturingOverhead, setManufacturingOverhead] = useState('');
  const [otherCosts, setOtherCosts] = useState('');
  const [transportation, setTransportation] = useState('');
  const [quantity, setQuantity] = useState('1'); // Default quantity to 1
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const dm = parseFloat(directMaterials || 0);
    const dl = parseFloat(directLabor || 0);
    const mo = parseFloat(manufacturingOverhead || 0);
    const oc = parseFloat(otherCosts || 0);
    const tr = parseFloat(transportation || 0);
    const qty = parseFloat(quantity || 1); // Default quantity to 1 if empty

    if (isNaN(dm) || isNaN(dl) || isNaN(mo) || isNaN(oc) || isNaN(tr) || isNaN(qty) || dm < 0 || dl < 0 || mo < 0 || oc < 0 || tr < 0 || qty <= 0) {
      setResults(null);
      return;
    }

    const totalProductCost = dm + dl + mo + oc + tr; // This is per unit
    const overallTotalCost = totalProductCost * qty; // Total for the given quantity

    setResults({
      directMaterials: dm,
      directLabor: dl,
      manufacturingOverhead: mo,
      otherCosts: oc,
      transportation: tr,
      totalProductCost: totalProductCost, // Per unit cost
      overallTotalCost: overallTotalCost, // Overall total cost
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-6 rounded-lg shadow-lg" style={{ backgroundColor: brandColors.white }}>
      {/* Input Section */}
      <div className="md:w-1/2 p-4">
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{t.tab0.title}</h3> {/* Use single title */}
        <InputField label={t.tab0.inputs.directMaterials} value={directMaterials} onChange={setDirectMaterials} />
        <InputField label={t.tab0.inputs.directLabor} value={directLabor} onChange={setDirectLabor} />
        <InputField label={t.tab0.inputs.manufacturingOverhead} value={manufacturingOverhead} onChange={setManufacturingOverhead} />
        <InputField label={t.tab0.inputs.otherCosts} value={otherCosts} onChange={setOtherCosts} />
        <InputField label={t.tab0.inputs.transportation} value={transportation} onChange={setTransportation} />
        <InputField label={t.tab0.inputs.quantity} value={quantity} onChange={setQuantity} min="1" placeholder="1" /> {/* New quantity input */}
        <button
          onClick={handleCalculate}
          className="w-full py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
          style={{ backgroundColor: brandColors.primary, boxShadow: `0 4px ${brandColors.darkBlue}` }}
        >
          {language === 'es' ? 'Calcular' : 'Calculate'}
        </button>
      </div>

      {/* Results Section */}
      <div className="md:w-1/2 p-4 md:border-l border-gray-200" style={{ borderColor: brandColors.accent2 }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{language === 'es' ? 'Resultados' : 'Results'}</h3>
        {results ? (
          <div>
            <ResultDisplay label={t.tab0.outputs.directMaterials} value={formatCurrency(results.directMaterials)} />
            <ResultDisplay label={t.tab0.outputs.directLabor} value={formatCurrency(results.directLabor)} />
            <ResultDisplay label={t.tab0.outputs.manufacturingOverhead} value={formatCurrency(results.manufacturingOverhead)} />
            <ResultDisplay label={t.tab0.outputs.otherCosts} value={formatCurrency(results.otherCosts)} />
            <ResultDisplay label={t.tab0.outputs.transportation} value={formatCurrency(results.transportation)} />
            <ResultDisplay label={t.tab0.outputs.totalProductCost} value={formatCurrency(results.totalProductCost)} /> {/* Per unit cost */}
            <ResultDisplay label={t.tab0.outputs.overallTotalCost} value={formatCurrency(results.overallTotalCost)} isHighlighted={true} /> {/* Overall total cost, highlighted */}
          </div>
        ) : (
          <p className="text-gray-500">{language === 'es' ? 'Introduce los valores y haz clic en Calcular.' : 'Enter values and click Calculate.'}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">{t.tab0.inputGuidance}</p> {/* Input guidance moved here */}
      </div>
    </div>
  );
};


// Calculator Tab 1: Cost to Price
const CostToPriceCalculator = ({ language, t }) => {
  const [cost, setCost] = useState('');
  const [desiredMargin, setDesiredMargin] = useState('');
  const [taxRate, setTaxRate] = useState(''); // New state for tax rate
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const c = parseFloat(cost);
    const dm = parseFloat(desiredMargin);
    const tr = parseFloat(taxRate || 0); // Use 0 if empty for tax rate

    if (isNaN(c) || isNaN(dm) || isNaN(tr) || dm >= 100 || dm < 0 || tr < 0) {
      setResults(null);
      return;
    }

    const suggestedSellingPrice = c / (1 - dm / 100); // Price before tax
    const taxAmount = suggestedSellingPrice * (tr / 100);
    const suggestedSellingPriceWithTax = suggestedSellingPrice + taxAmount;
    const profitPerUnit = suggestedSellingPrice - c;
    const markup = (c === 0) ? 0 : ((suggestedSellingPrice - c) / c) * 100;
    const profitMargin = (suggestedSellingPrice === 0) ? 0 : ((suggestedSellingPrice - c) / suggestedSellingPrice) * 100;

    setResults({
      cost: c,
      profitMargin: profitMargin,
      suggestedSellingPrice: suggestedSellingPrice,
      taxAmount: taxAmount, // New output
      suggestedSellingPriceWithTax: suggestedSellingPriceWithTax, // New output, highlighted
      markup: markup,
      profitPerUnit: profitPerUnit,
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-6 rounded-lg shadow-lg" style={{ backgroundColor: brandColors.white }}>
      {/* Input Section */}
      <div className="md:w-1/3 p-4">
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{t.tab1.title}</h3> {/* Use single title */}
        <InputField label={t.tab1.inputs.cost} value={cost} onChange={setCost} />
        <InputField label={t.tab1.inputs.desiredMargin} value={desiredMargin} onChange={setDesiredMargin} />
        <InputField label={t.tab1.inputs.taxRate} value={taxRate} onChange={setTaxRate} /> {/* New tax rate input */}
        <button
          onClick={handleCalculate}
          className="w-full py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
          style={{ backgroundColor: brandColors.primary, boxShadow: `0 4px ${brandColors.darkBlue}` }}
        >
          {language === 'es' ? 'Calcular' : 'Calculate'}
        </button>
      </div>

      {/* Results Section */}
      <div className="md:w-2/3 p-4 md:border-l border-gray-200" style={{ borderColor: brandColors.accent2 }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{language === 'es' ? 'Resultados' : 'Results'}</h3>
        {results ? (
          <div>
            <ResultDisplay label={t.tab1.outputs.cost} value={formatCurrency(results.cost)} />
            <ResultDisplay label={t.tab1.outputs.profitMargin} value={formatPercentage(results.profitMargin)} />
            <ResultDisplay label={t.tab1.outputs.suggestedSellingPrice} value={formatCurrency(results.suggestedSellingPrice)} />
            <ResultDisplay label={t.tab1.outputs.taxAmount} value={formatCurrency(results.taxAmount)} /> {/* New output */}
            <ResultDisplay label={t.tab1.outputs.suggestedSellingPriceWithTax} value={formatCurrency(results.suggestedSellingPriceWithTax)} isHighlighted={true} /> {/* New output, highlighted */}
            <ResultDisplay label={t.tab1.outputs.markup} value={formatPercentage(results.markup)} />
            <ResultDisplay label={t.tab1.outputs.profitPerUnit} value={formatCurrency(results.profitPerUnit)} />
          </div>
        ) : (
          <p className="text-gray-500">{language === 'es' ? 'Introduce los valores y haz clic en Calcular.' : 'Enter values and click Calculate.'}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">{t.tab1.inputGuidance}</p> {/* Input guidance moved here */}
      </div>
    </div>
  );
};

// Calculator Tab 2: Margin and Markup
const MarginMarkupCalculator = ({ language, t }) => {
  const [cost, setCost] = useState('');
  const [desiredSellingPrice, setDesiredSellingPrice] = useState('');
  const [taxRate, setTaxRate] = useState(''); // New state for tax rate
  const [isTaxIncluded, setIsTaxIncluded] = useState(null); // State for tax inclusion choice
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const c = parseFloat(cost);
    const dsp = parseFloat(desiredSellingPrice);
    const tr = parseFloat(taxRate || 0);

    if (isNaN(c) || isNaN(dsp) || dsp <= 0 || isNaN(tr) || tr < 0 || isTaxIncluded === null) {
      setResults(null); // Clear results if mandatory choice is not made
      return;
    }

    let dsp_pre_tax;
    let taxAmount;
    let dsp_with_tax;

    if (isTaxIncluded) { // If desired selling price includes tax
      dsp_with_tax = dsp;
      dsp_pre_tax = dsp_with_tax / (1 + tr / 100);
      taxAmount = dsp_with_tax - dsp_pre_tax;
    } else { // If desired selling price does NOT include tax
      dsp_pre_tax = dsp;
      taxAmount = dsp_pre_tax * (tr / 100);
      dsp_with_tax = dsp_pre_tax + taxAmount;
    }

    const profitPerUnit = dsp_pre_tax - c;
    const profitMargin = (dsp_pre_tax === 0) ? 0 : (profitPerUnit / dsp_pre_tax) * 100;
    const markup = (c === 0) ? 0 : (profitPerUnit / c) * 100;

    setResults({
      cost: c,
      desiredSellingPricePreTax: dsp_pre_tax,
      taxAmount: taxAmount,
      desiredSellingPriceWithTax: dsp_with_tax,
      profitMargin: profitMargin,
      markup: markup,
      profitPerUnit: profitPerUnit,
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-6 rounded-lg shadow-lg" style={{ backgroundColor: brandColors.white }}>
      {/* Input Section */}
      <div className="md:w-1/3 p-4">
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{t.tab2.title}</h3> {/* Use single title */}
        <InputField label={t.tab2.inputs.cost} value={cost} onChange={setCost} />
        <InputField label={t.tab2.inputs.desiredSellingPrice} value={desiredSellingPrice} onChange={setDesiredSellingPrice} />
        <InputField label={t.tab2.inputs.taxRate} value={taxRate} onChange={setTaxRate} /> {/* New tax rate input */}

        {/* Tax Inclusion Choice */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" style={{ color: brandColors.darkBlue }}>
            {t.tab2.inputs.taxIncludedQuestion}
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="tax_included"
                value="yes"
                checked={isTaxIncluded === true}
                onChange={() => setIsTaxIncluded(true)}
                className="form-radio h-4 w-4"
                style={{ color: brandColors.blue2 }}
              />
              <span className="ml-2 text-sm font-semibold" style={{ color: brandColors.darkBlue }}>{t.tab2.inputs.taxIncludedYes}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="tax_included"
                value="no"
                checked={isTaxIncluded === false}
                onChange={() => setIsTaxIncluded(false)}
                className="form-radio h-4 w-4"
                style={{ color: brandColors.blue2 }}
              />
              <span className="ml-2 text-sm font-semibold" style={{ color: brandColors.darkBlue }}>{t.tab2.inputs.taxIncludedNo}</span>
            </label>
          </div>
          {isTaxIncluded === null && (
            <p className="text-red-500 text-xs italic mt-1">{t.tab2.mandatoryChoiceGuidance}</p>
          )}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
          style={{ backgroundColor: brandColors.primary, boxShadow: `0 4px ${brandColors.darkBlue}` }}
        >
          {language === 'es' ? 'Calcular' : 'Calculate'}
        </button>
      </div>

      {/* Results Section */}
      <div className="md:w-2/3 p-4 md:border-l border-gray-200" style={{ borderColor: brandColors.accent2 }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{language === 'es' ? 'Resultados' : 'Results'}</h3>
        {results ? (
          <div>
            <ResultDisplay label={t.tab2.outputs.cost} value={formatCurrency(results.cost)} />
            <ResultDisplay label={t.tab2.outputs.desiredSellingPricePreTax} value={formatCurrency(results.desiredSellingPricePreTax)} isHighlighted={true} /> {/* Highlighted */}
            <ResultDisplay label={t.tab2.outputs.taxAmount} value={formatCurrency(results.taxAmount)} />
            <ResultDisplay label={t.tab2.outputs.desiredSellingPriceWithTax} value={formatCurrency(results.desiredSellingPriceWithTax)} isHighlighted={true} />
            <ResultDisplay label={t.tab2.outputs.profitMargin} value={formatPercentage(results.profitMargin)} isHighlighted={true} />
            <ResultDisplay label={t.tab2.outputs.markup} value={formatPercentage(results.markup)} isHighlighted={true} />
            <ResultDisplay label={t.tab2.outputs.profitPerUnit} value={formatCurrency(results.profitPerUnit)} />
          </div>
        ) : (
          <p className="text-gray-500">{language === 'es' ? 'Introduce los valores y haz clic en Calcular.' : 'Enter values and click Calculate.'}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">{t.tab2.inputGuidance}</p> {/* Input guidance moved here */}
      </div>
    </div>
  );
};

// Calculator Tab 3: Double Margin Calculation (formerly Tab 4)
const DoubleMarginCalculator = ({ language, t }) => {
  // Section 1: Adjusted Margin
  const [s1Cost, setS1Cost] = useState('');
  const [s1SuggestedRetailPrice, setS1SuggestedRetailPrice] = useState('');
  const [s1WholesalerDesiredMargin, setS1WholesalerDesiredMargin] = useState('');
  const [s1TaxRate, setS1TaxRate] = useState(''); // New state for tax rate in section 1
  const [isTaxIncludedS1, setIsTaxIncludedS1] = useState(null); // State for tax inclusion choice in section 1
  const [s1Results, setS1Results] = useState(null);

  const handleS1Calculate = () => {
    const c = parseFloat(s1Cost);
    const srp_input = parseFloat(s1SuggestedRetailPrice); // This is the user's input for retail price
    const wdm = parseFloat(s1WholesalerDesiredMargin);
    const tr = parseFloat(s1TaxRate || 0);

    if (isNaN(c) || isNaN(srp_input) || isNaN(wdm) || isNaN(tr) || wdm >= 100 || srp_input <= 0 || wdm < 0 || tr < 0 || isTaxIncludedS1 === null) {
      setS1Results(null);
      return;
    }

    let srp_pre_tax;
    let srp_with_tax;
    let taxAmount;

    if (isTaxIncludedS1) { // If suggested retail price includes tax
      srp_with_tax = srp_input;
      srp_pre_tax = srp_with_tax / (1 + tr / 100);
      taxAmount = srp_with_tax - srp_pre_tax;
    } else { // If suggested retail price does NOT include tax
      srp_pre_tax = srp_input;
      taxAmount = srp_pre_tax * (tr / 100);
      srp_with_tax = srp_pre_tax + taxAmount;
    }

    // Direct Sales (for comparison)
    const directGrossMargin = (srp_pre_tax === 0) ? 0 : ((srp_pre_tax - c) / srp_pre_tax) * 100;
    const directProfit = srp_pre_tax - c;

    // Adjusted Wholesale Sales
    const priceToWholesaler = srp_pre_tax * (1 - wdm / 100);
    const sellerAdjustedMargin = (priceToWholesaler === 0) ? 0 : ((priceToWholesaler - c) / priceToWholesaler) * 100;
    const sellerProfit = priceToWholesaler - c;
    const wholesalerMargin = wdm; // Wholesaler's desired margin is their actual margin here

    setS1Results({
      directSales: {
        suggestedRetailPrice: srp_pre_tax,
        taxAmount: taxAmount, // Use the calculated tax amount
        suggestedRetailPriceWithTax: srp_with_tax, // Use the calculated price with tax
        cost: c,
        grossMargin: directGrossMargin,
        profit: directProfit,
      },
      adjustedWholesaleSales: {
        suggestedRetailPrice: srp_pre_tax, // Pre-tax retail price
        taxAmount: taxAmount,
        suggestedRetailPriceWithTax: srp_with_tax, // Use the calculated price with tax
        cost: c,
        priceToWholesaler: priceToWholesaler,
        wholesalerMargin: wholesalerMargin,
        sellerAdjustedMargin: sellerAdjustedMargin,
        sellerProfit: sellerProfit,
      },
    });
  };

  // Section 2: Desired Margin
  const [s2Cost, setS2Cost] = useState('');
  const [s2DesiredMargin, setS2DesiredMargin] = useState('');
  const [s2WholesalerDesiredMargin, setS2WholesalerDesiredMargin] = useState('');
  const [s2TaxRate, setS2TaxRate] = useState(''); // New state for tax rate in section 2
  const [isTaxIncludedS2, setIsTaxIncludedS2] = useState(null); // State for tax inclusion choice in section 2
  const [s2Results, setS2Results] = useState(null);

  const handleS2Calculate = () => {
    const c = parseFloat(s2Cost);
    const dm = parseFloat(s2DesiredMargin);
    const wdm = parseFloat(s2WholesalerDesiredMargin);
    const tr = parseFloat(s2TaxRate || 0);

    if (isNaN(c) || isNaN(dm) || isNaN(wdm) || isNaN(tr) || dm >= 100 || wdm >= 100 || dm < 0 || wdm < 0 || tr < 0 || isTaxIncludedS2 === null) {
      setS2Results(null);
      return;
    }

    const priceToWholesaler = c / (1 - dm / 100);
    let suggestedPublicSellingPrice_pre_tax = priceToWholesaler / (1 - wdm / 100); // Pre-tax public selling price
    const yourProfit = priceToWholesaler - c;
    const wholesalerProfit_pre_tax = suggestedPublicSellingPrice_pre_tax - priceToWholesaler;

    let taxAmount;
    let suggestedPublicSellingPrice_with_tax;

    // For desired margin, the suggestedPublicSellingPrice is already pre-tax from calculation
    // So we just apply tax to it.
    taxAmount = suggestedPublicSellingPrice_pre_tax * (tr / 100);
    suggestedPublicSellingPrice_with_tax = suggestedPublicSellingPrice_pre_tax + taxAmount;


    setS2Results({
      cost: c,
      desiredMargin: dm,
      wholesalerDesiredMargin: wdm,
      priceToWholesaler: priceToWholesaler,
      suggestedPublicSellingPrice: suggestedPublicSellingPrice_pre_tax,
      taxAmount: taxAmount,
      suggestedPublicSellingPriceWithTax: suggestedPublicSellingPrice_with_tax,
      yourProfit: yourProfit,
      wholesalerProfit: wholesalerProfit_pre_tax, // This is pre-tax profit
    });
  };

  return (
    <div className="flex flex-col p-6 rounded-lg shadow-lg" style={{ backgroundColor: brandColors.white }}>
      {/* Section 1: Adjusted Margin */}
      <div className="mb-8 p-4 border rounded-lg" style={{ borderColor: brandColors.accent1 }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{t.tab3.section1.title}</h3>
        <div className="flex flex-col md:flex-row">
          {/* Inputs */}
          <div className="md:w-1/3 p-4">
            <InputField label={t.tab3.section1.inputs.cost} value={s1Cost} onChange={setS1Cost} />
            <InputField label={t.tab3.section1.inputs.suggestedRetailPrice} value={s1SuggestedRetailPrice} onChange={setS1SuggestedRetailPrice} />
            <InputField label={t.tab3.section1.inputs.wholesalerDesiredMargin} value={s1WholesalerDesiredMargin} onChange={setS1WholesalerDesiredMargin} />
            <InputField label={t.tab3.section1.inputs.taxRate} value={s1TaxRate} onChange={setS1TaxRate} /> {/* New tax rate input */}

            {/* Tax Inclusion Choice for Section 1 */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" style={{ color: brandColors.darkBlue }}>
                {t.tab3.section1.inputs.taxIncludedQuestion}
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tax_included_s1"
                    value="yes"
                    checked={isTaxIncludedS1 === true}
                    onChange={() => setIsTaxIncludedS1(true)}
                    className="form-radio h-4 w-4"
                    style={{ color: brandColors.blue2 }}
                  />
                  <span className="ml-2 text-sm font-semibold" style={{ color: brandColors.darkBlue }}>{t.tab3.section1.inputs.taxIncludedYes}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tax_included_s1"
                    value="no"
                    checked={isTaxIncludedS1 === false}
                    onChange={() => setIsTaxIncludedS1(false)}
                    className="form-radio h-4 w-4"
                    style={{ color: brandColors.blue2 }}
                  />
                  <span className="ml-2 text-sm font-semibold" style={{ color: brandColors.darkBlue }}>{t.tab3.section1.inputs.taxIncludedNo}</span>
                </label>
              </div>
              {isTaxIncludedS1 === null && (
                <p className="text-red-500 text-xs italic mt-1">{t.tab3.section1.mandatoryChoiceGuidance}</p>
              )}
            </div>

            <button
              onClick={handleS1Calculate}
              className="w-full py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
              style={{ backgroundColor: brandColors.primary, boxShadow: `0 4px ${brandColors.darkBlue}` }}
            >
              {language === 'es' ? 'Calcular' : 'Calculate'}
            </button>
            <p className="text-sm text-gray-500 mt-2">{t.tab3.section1.inputGuidance}</p> {/* Input guidance */}
          </div>
          {/* Results */}
          <div className="md:w-2/3 p-4 md:border-l border-gray-200" style={{ borderColor: brandColors.accent2 }}>
            <h4 className="font-bold mb-2" style={{ color: brandColors.primary }}>{language === 'es' ? 'Resultados' : 'Results'}</h4>
            {s1Results ? (
              <div className="space-y-4">
                <div className="border p-3 rounded-md" style={{ borderColor: brandColors.accent1 }}>
                  <h5 className="font-semibold mb-2" style={{ color: brandColors.primary }}>{t.tab3.section1.outputs.directSales}</h5>
                  <ResultDisplay label={t.tab3.section1.outputs.suggestedRetailPrice} value={formatCurrency(s1Results.directSales.suggestedRetailPrice)} isHighlighted={true} /> {/* Highlighted */}
                  <ResultDisplay label={t.tab3.section1.outputs.taxAmount} value={formatCurrency(s1Results.directSales.taxAmount)} />
                  <ResultDisplay label={t.tab3.section1.outputs.suggestedRetailPriceWithTax} value={formatCurrency(s1Results.directSales.suggestedRetailPriceWithTax)} isHighlighted={true} />
                  <ResultDisplay label={t.tab3.section1.outputs.cost} value={formatCurrency(s1Results.directSales.cost)} />
                  <ResultDisplay label={t.tab3.section1.outputs.grossMargin} value={formatPercentage(s1Results.directSales.grossMargin)} />
                  <ResultDisplay label={t.tab3.section1.outputs.profit} value={formatCurrency(s1Results.directSales.profit)} />
                </div>
                <div className="border p-3 rounded-md" style={{ borderColor: brandColors.accent1 }}>
                  <h5 className="font-semibold mb-2" style={{ color: brandColors.primary }}>{t.tab3.section1.outputs.adjustedWholesaleSales}</h5>
                  <ResultDisplay label={t.tab3.section1.outputs.suggestedRetailPrice} value={formatCurrency(s1Results.adjustedWholesaleSales.suggestedRetailPrice)} isHighlighted={true} /> {/* Highlighted */}
                  <ResultDisplay label={t.tab3.section1.outputs.taxAmount} value={formatCurrency(s1Results.adjustedWholesaleSales.taxAmount)} />
                  <ResultDisplay label={t.tab3.section1.outputs.suggestedRetailPriceWithTax} value={formatCurrency(s1Results.adjustedWholesaleSales.suggestedRetailPriceWithTax)} isHighlighted={true} />
                  <ResultDisplay label={t.tab3.section1.outputs.cost} value={formatCurrency(s1Results.adjustedWholesaleSales.cost)} />
                  <ResultDisplay label={t.tab3.section1.outputs.priceToWholesaler} value={formatCurrency(s1Results.adjustedWholesaleSales.priceToWholesaler)} />
                  <ResultDisplay label={t.tab3.section1.outputs.wholesalerMargin} value={formatPercentage(s1Results.adjustedWholesaleSales.wholesalerMargin)} /> {/* NOT highlighted anymore */}
                  <ResultDisplay label={t.tab3.section1.outputs.sellerAdjustedMargin} value={formatPercentage(s1Results.adjustedWholesaleSales.sellerAdjustedMargin)} isHighlighted={true} />
                  <ResultDisplay label={t.tab3.section1.outputs.sellerProfit} value={formatCurrency(s1Results.adjustedWholesaleSales.sellerProfit)} />
                </div>
              </div>
            ) : (
              <p className="text-gray-500">{language === 'es' ? 'Introduce los valores y haz clic en Calcular.' : 'Enter values and click Calculate.'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Desired Margin */}
      <div className="p-4 border rounded-lg" style={{ borderColor: brandColors.accent1 }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{t.tab3.section2.title}</h3>
        <div className="flex flex-col md:flex-row">
          {/* Inputs */}
          <div className="md:w-1/3 p-4">
            <InputField label={t.tab3.section2.inputs.cost} value={s2Cost} onChange={setS2Cost} />
            <InputField label={t.tab3.section2.inputs.desiredMargin} value={s2DesiredMargin} onChange={setS2DesiredMargin} />
            <InputField label={t.tab3.section2.inputs.wholesalerDesiredMargin} value={s2WholesalerDesiredMargin} onChange={setS2WholesalerDesiredMargin} />
            <InputField label={t.tab3.section2.inputs.taxRate} value={s2TaxRate} onChange={setS2TaxRate} /> {/* New tax rate input */}

            {/* Tax Inclusion Choice for Section 2 */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" style={{ color: brandColors.darkBlue }}>
                {t.tab3.section2.inputs.taxIncludedQuestion}
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tax_included_s2"
                    value="yes"
                    checked={isTaxIncludedS2 === true}
                    onChange={() => setIsTaxIncludedS2(true)}
                    className="form-radio h-4 w-4"
                    style={{ color: brandColors.blue2 }}
                  />
                  <span className="ml-2 text-sm font-semibold" style={{ color: brandColors.darkBlue }}>{t.tab3.section2.inputs.taxIncludedYes}</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="tax_included_s2"
                    value="no"
                    checked={isTaxIncludedS2 === false}
                    onChange={() => setIsTaxIncludedS2(false)}
                    className="form-radio h-4 w-4"
                    style={{ color: brandColors.blue2 }}
                  />
                  <span className="ml-2 text-sm font-semibold" style={{ color: brandColors.darkBlue }}>{t.tab3.section2.inputs.taxIncludedNo}</span>
                </label>
              </div>
              {isTaxIncludedS2 === null && (
                <p className="text-red-500 text-xs italic mt-1">{t.tab3.section2.mandatoryChoiceGuidance}</p>
              )}
            </div>

            <button
              onClick={handleS2Calculate}
              className="w-full py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105"
              style={{ backgroundColor: brandColors.primary, boxShadow: `0 4px ${brandColors.darkBlue}` }}
            >
              {language === 'es' ? 'Calcular' : 'Calculate'}
            </button>
            <p className="text-sm text-gray-500 mt-2">{t.tab3.section2.inputGuidance}</p> {/* Input guidance */}
          </div>
          {/* Results */}
          <div className="md:w-2/3 p-4 md:border-l border-gray-200" style={{ borderColor: brandColors.accent2 }}>
            <h4 className="font-bold mb-2" style={{ color: brandColors.primary }}>{language === 'es' ? 'Resultados' : 'Results'}</h4>
            {s2Results ? (
              <div>
                <ResultDisplay label={t.tab3.section2.outputs.cost} value={formatCurrency(s2Results.cost)} />
                <ResultDisplay label={t.tab3.section2.outputs.desiredMargin} value={formatPercentage(s2Results.desiredMargin)} />
                <ResultDisplay label={t.tab3.section2.outputs.wholesalerDesiredMargin} value={formatPercentage(s2Results.wholesalerDesiredMargin)} /> {/* NOT highlighted anymore */}
                <ResultDisplay label={t.tab3.section2.outputs.priceToWholesaler} value={formatCurrency(s2Results.priceToWholesaler)} />
                <ResultDisplay label={t.tab3.section2.outputs.suggestedPublicSellingPrice} value={formatCurrency(s2Results.suggestedPublicSellingPrice)} isHighlighted={true} /> {/* Highlighted */}
                <ResultDisplay label={t.tab3.section2.outputs.taxAmount} value={formatCurrency(s2Results.taxAmount)} />
                <ResultDisplay label={t.tab3.section2.outputs.suggestedPublicSellingPriceWithTax} value={formatCurrency(s2Results.suggestedPublicSellingPriceWithTax)} isHighlighted={true} />
                <ResultDisplay label={t.tab3.section2.outputs.yourProfit} value={formatCurrency(s2Results.yourProfit)} />
                <ResultDisplay label={t.tab3.section2.outputs.wholesalerProfit} value={formatCurrency(s2Results.wholesalerProfit)} />
              </div>
            ) : (
              <p className="text-gray-500">{language === 'es' ? 'Introduce los valores y haz clic en Calcular.' : 'Enter values and click Calculate.'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Main App Component
const CalculadoraDePrecios = () => {
  const [language, setLanguage] = useState('es'); // Default to Spanish
  const [activeTab, setActiveTab] = useState('tab0'); // Start with the new Product Cost tab
  const t = translations[language]; // Get current translations

  // State for collapsible footer sections
  const [showConcepts, setShowConcepts] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'tab0':
        return <ProductCostCalculator language={language} t={t} />;
      case 'tab1':
        return <CostToPriceCalculator language={language} t={t} />;
      case 'tab2':
        return <MarginMarkupCalculator language={language} t={t} />;
      case 'tab3': // Old tab4, now tab3
        return <DoubleMarginCalculator language={language} t={t} />;
      default:
        return <ProductCostCalculator language={language} t={t} />;
    }
  };

  return (
    <div className="min-h-screen p-4" style={{ fontFamily: 'Albert Sans' }}>
      {/* Header */}
      <header className="text-center mb-8 pt-8"> {/* Added pt-8 for top margin */}
        <h1 className="text-4xl font-bold mb-2" style={{ color: brandColors.primary }}>{t.mainTitle}</h1>
        <p className="text-lg mb-1" style={{ color: brandColors.darkBlue }}>{t.subtitle1}</p>
        <p className="text-xl font-semibold" style={{ color: brandColors.secondary }}>{t.subtitle2}</p>
        {/* Language Toggle */}
        <div className="absolute top-4 right-4 flex items-center bg-gray-200 rounded-full p-1" style={{ backgroundColor: brandColors.blue1 }}>
          <button
            onClick={() => setLanguage('es')}
            className={`py-1 px-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
              language === 'es' ? 'text-white' : 'text-gray-700'
            }`}
            style={{ backgroundColor: language === 'es' ? brandColors.blue2 : 'transparent', color: language === 'es' ? brandColors.white : brandColors.darkBlue }}
          >
            ES
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`py-1 px-3 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
              language === 'en' ? 'text-white' : 'text-gray-700'
            }`}
            style={{ backgroundColor: language === 'en' ? brandColors.blue2 : 'transparent', color: language === 'en' ? brandColors.white : brandColors.darkBlue }}
          >
            EN
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="mb-8 overflow-x-auto">
        <ul className="flex justify-center gap-x-2 w-full">
          {[
            { id: 'tab0', title: t.tab0.title },
            { id: 'tab1', title: t.tab1.title },
            { id: 'tab2', title: t.tab2.title },
            { id: 'tab3', title: t.tab3.title }, // Old tab4, now tab3
          ].map((tab) => (
            <li key={tab.id} className="flex-1 flex-shrink-0 mb-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-2 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 w-full h-full flex items-center justify-center text-center ${
                  activeTab === tab.id ? 'bg-opacity-100' : 'bg-opacity-70'
                }`}
                style={{ backgroundColor: activeTab === tab.id ? brandColors.primary : brandColors.secondary }}
              >
                <span className="block text-base leading-tight">{tab.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Calculator Content */}
      <main className="max-w-6xl mx-auto">
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <footer className="text-center mt-12 p-4 border-t border-gray-300" style={{ borderColor: brandColors.accent2 }}>
        {/* Toggle Buttons for Concepts and Formulas */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => {
              setShowConcepts(!showConcepts);
              setShowFormulas(false); // Close formulas if concepts are opened
            }}
            className="py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 flex-1" // Added flex-1
            style={{ backgroundColor: brandColors.blue2, boxShadow: `0 4px ${brandColors.darkBlue}` }}
          >
            {language === 'es' ? (showConcepts ? 'Ocultar Conceptos Clave' : 'Mostrar Conceptos Clave') : (showConcepts ? 'Hide Key Concepts' : 'Show Key Concepts')}
          </button>
          <button
            onClick={() => {
              setShowFormulas(!showFormulas);
              setShowConcepts(false); // Close concepts if formulas are opened
            }}
            className="py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 flex-1" // Added flex-1
            style={{ backgroundColor: brandColors.green2, boxShadow: `0 4px ${brandColors.darkGreen}` }}
          >
            {language === 'es' ? (showFormulas ? 'Ocultar Fórmulas' : 'Mostrar Fórmulas') : (showFormulas ? 'Hide Formulas' : 'Show Formulas')}
          </button>
        </div>

        {/* All Concepts Section (Collapsible) */}
        {showConcepts && (
          <div className="mt-4 py-2 px-4 border-t border-gray-200 rounded-lg" style={{ borderColor: brandColors.accent2, backgroundColor: brandColors.lightGray2 }}>
            <h4 className="text-lg font-bold mb-3" style={{ color: brandColors.darkBlue }}>{language === 'es' ? 'Conceptos Clave' : 'Key Concepts'}</h4>
            <p className="mb-4 text-sm text-gray-700" style={{ color: brandColors.darkBlue }}>
              {language === 'es' ?
                'Esta sección define los términos clave y las fórmulas utilizadas en la calculadora. La "Utilidad" mencionada en las pestañas se refiere a la utilidad bruta por unidad, calculada como Ingreso por unidad - Costo por unidad.' :
                'This section defines key terms and formulas used in the calculator. "Profit" mentioned in the tabs refers to gross profit per unit, calculated as Revenue per unit - Cost per unit.'
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-left">
              {Object.entries(t.footer.allConcepts).map(([key, value]) => (
                <div key={key} className="mb-2 p-2 rounded-md" style={{ backgroundColor: brandColors.lightGray1 }}>
                  <p><span className="font-semibold" style={{ color: brandColors.primary }}>{value.split(':')[0]}:</span> <span dangerouslySetInnerHTML={{ __html: value.split(':')[1] }} /></p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Formulas Section (Collapsible) */}
        {showFormulas && (
          <div className="mt-4 py-2 px-4 border-t border-gray-200 rounded-lg" style={{ borderColor: brandColors.accent2, backgroundColor: brandColors.lightGray2 }}>
            <h4 className="text-lg font-bold mb-3" style={{ color: brandColors.darkBlue }}>{language === 'es' ? 'Fórmulas Utilizadas' : 'Fórmulas Used'}</h4>
            {/* Render formulas based on activeTab */}
            {activeTab === 'tab3' ? ( // Double Margin Calculation tab
              <>
                {/* Formulas for Adjusted Margin part of tab3 */}
                <div className="mb-6 text-left">
                  <h5 className="font-bold mb-2" style={{ color: brandColors.secondary }}>{t.footer.allFormulas.tab3_section1.title}</h5>
                  <div className="space-y-2 text-sm">
                    {Object.entries(t.footer.allFormulas.tab3_section1).map(([formulaKey, formulaValue]) => {
                      if (formulaKey !== 'title') {
                        return (
                          <p key={formulaKey} className="font-mono p-2 rounded-md" style={{ color: brandColors.darkBlue, backgroundColor: brandColors.lightGray1 }} dangerouslySetInnerHTML={{ __html: formulaValue }} />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                {/* Formulas for Desired Margin part of tab3 */}
                <div className="mb-6 text-left">
                  <h5 className="font-bold mb-2" style={{ color: brandColors.secondary }}>{t.footer.allFormulas.tab3_section2.title}</h5>
                  <div className="space-y-2 text-sm">
                    {Object.entries(t.footer.allFormulas.tab3_section2).map(([formulaKey, formulaValue]) => {
                      if (formulaKey !== 'title') {
                        return (
                          <p key={formulaKey} className="font-mono p-2 rounded-md" style={{ color: brandColors.darkBlue, backgroundColor: brandColors.lightGray1 }} dangerouslySetInnerHTML={{ __html: formulaValue }} />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </>
            ) : (
              // General rendering for other tabs
              t.footer.allFormulas[activeTab] && (
                <div className="mb-6 text-left">
                  <h5 className="font-bold mb-2" style={{ color: brandColors.secondary }}>{t.footer.allFormulas[activeTab].title}</h5>
                  <div className="space-y-2 text-sm">
                    {Object.entries(t.footer.allFormulas[activeTab]).map(([formulaKey, formulaValue]) => {
                      if (formulaKey !== 'title') {
                        return (
                          <p key={formulaKey} className="font-mono p-2 rounded-md" style={{ color: brandColors.darkBlue, backgroundColor: brandColors.lightGray1 }} dangerouslySetInnerHTML={{ __html: formulaValue }} />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        <p className="text-sm text-gray-500 mt-8" style={{ color: brandColors.darkBlue }} dangerouslySetInnerHTML={{ __html: t.footer.disclaimer }}></p>
      </footer>
    </div>
  );
};

export default CalculadoraDePrecios;
