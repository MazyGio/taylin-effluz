const calculadoraPrecios_es = {
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
            costTypeQuestion: "¿Los costos ingresados son por unidad o por el total de la orden?",
            costTypePerUnit: "Por unidad",
            costTypeTotalOrder: "Total de la orden",
        },
        outputs: {
            directMaterials: "Costo de Materiales Directos",
            directLabor: "Costo de Mano de Obra Directa",
            manufacturingOverhead: "Costos Indirectos de Fabricación",
            otherCosts: "Otros Costos",
            transportation: "Transporte",
            totalProductCost: "Costo total del producto (por unidad)", // Adjusted capitalization
            overallTotalCost: "Costo total general", // Adjusted capitalization
            perUnitCost: "Costo total del producto (por unidad)", // Simplified label for display
            totalOrderCost: "Costo total general", // Simplified label for display
        },
        inputGuidance: "Si algún dato no aplica, coloca 0.",
        mandatoryChoiceGuidance: "Selecciona una opción para el tipo de costo."
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
            directMaterials: "Costo de materiales directos: El costo de las materias primas que se convierten directamente en el producto final (ej. madera para un mueble).",
            directLabor: "Costo de mano de obra directa: El costo de la mano de obra directamente involucrada en la fabricación del producto (ej. salario de un ensamblador).",
            manufacturingOverhead: "Costos indirectos de fabricación: Todos los costos de fabricación que no son materiales directos ni mano de obra directa (ej. alquiler de fábrica, servicios públicos, depreciación de maquinaria).",
            otherCosts: "Otros costos: Cualquier otro costo asociado directamente con la producción o adquisición del producto que no encaja en las categorías anteriores (ej. empaque especial, licencias por unidad).",
            transportation: "Transporte: Costos incurridos para mover materiales o productos, ya sea para recibir insumos (flete de entrada) o para enviar productos terminados (flete de salida).",
            quantity: "Cantidad: El número total de unidades de un producto que se fabrican o consideran en un cálculo.", // New concept for quantity
            totalProductCost: "Costo total del producto (por unidad): La suma de todos los costos directos e indirectos asociados con la producción de una unidad de producto. Representa el costo completo de fabricar un artículo.",
            overallTotalCost: "Costo total general: El costo total de un número específico de unidades del producto. Se calcula multiplicando el Costo Total del Producto (por unidad) por la Cantidad.",
            profitMargin: "Margen de utilidad (Margen): Es el porcentaje de utilidad que se obtiene sobre el precio de venta. Indica cuánto beneficio se genera por cada dólar de venta. Se calcula como (Utilidad / Precio de Venta) * 100.",
            markup: "Markup: Es el porcentaje que se le añade al costo de un producto para determinar su precio de venta. Indica cuánto se incrementa el costo para llegar al precio de venta. Se calcula como ((Precio de Venta - Costo) / Costo) * 100.",
            profit: "Utilidad (Ganancia): Es la ganancia monetaria *bruta por unidad* obtenida de una venta o transacción, antes de considerar gastos operativos generales. Se calcula como Precio de Venta - Costo.",
            suggestedSellingPrice: "Precio de venta sugerido: El precio recomendado al que se debería vender un producto para alcanzar un margen deseado, antes de aplicar impuestos. Se deriva del costo y el margen objetivo.",
            taxRate: "Impuesto (%): El porcentaje de impuesto que se aplica al precio de venta del producto en un país o región específica.",
            taxAmount: "Monto de impuesto: La cantidad monetaria del impuesto calculado sobre el precio de venta. Se calcula como Precio de Venta Sugerido * (Impuesto / 100).",
            suggestedSellingPriceWithTax: "Precio de venta sugerido (con impuesto): El precio final recomendado al que se debería vender un producto, incluyendo el impuesto aplicable. Se calcula como Precio de Venta Sugerido (sin impuesto) + Monto de Impuesto.",
            priceToWholesaler: "Precio mayorista: El precio al que mi negocio vende sus productos a un distribuidor o mayorista. Es el ingreso para mi negocio y el costo para el mayorista.",
            wholesalerCost: "Costo mayorista: El costo de adquisición del producto para el mayorista, que es igual al Precio Mayorista fijado por mi negocio.",
            wholesalerMargin: "Margen mayorista: El porcentaje de ganancia que el mayorista busca obtener sobre su precio de venta al público. Es su propio margen de beneficio.",
            suggestedFinalSellingPrice: "Precio de venta sugerido final (Precio de Venta al Público): El precio recomendado al que el mayorista debería vender el producto al consumidor final, considerando su propio margen deseado.",
            directSales: "Ventas directas: Se refiere a los cálculos de margen y utilidad cuando mi negocio vende directamente al consumidor final, sin intermediarios.",
            adjustedWholesaleSales: "Ventas ajustado a mayorista: Cálculos de margen y utilidad que reflejan cómo se ajustan los beneficios de mi negocio cuando se vende a un mayorista, manteniendo un precio de venta al público fijo.",
            grossMargin: "Margen bruto: La diferencia entre los ingresos por ventas y el costo de los bienes vendidos (Costo del Producto), expresada como porcentaje. Es una medida de la rentabilidad de las ventas antes de los gastos operativos.",
            sellerAdjustedMargin: "Margen de mi negocio ajustado: Tu margen de ganancia después de considerar el margen que el mayorista necesita o desea obtener. Es tu margen real cuando vendes a través de un mayorista.",
            discountRate: "Descuento (%): El porcentaje de reducción aplicado al precio de venta de un producto.", // New concept
            discountAmount: "Monto de descuento: La cantidad monetaria de la reducción aplicada al precio de venta. Se calcula como Precio de Venta Sugerido * (Descuento / 100).", // New concept
            sellingPriceAfterDiscountPreTax: "Precio de venta sugerido (con descuento, sin impuesto): El precio del producto después de aplicar un descuento, antes de impuestos.", // New concept
            sellingPriceAfterDiscountWithTax: "Precio de venta sugerido (con descuento, con impuesto): El precio final del producto después de aplicar un descuento y sumar los impuestos.", // New concept
            profitMarginAfterDiscount: "Margen de utilidad (con descuento): El margen de ganancia calculado después de aplicar un descuento al precio de venta. Se calcula como (Utilidad con Descuento / Precio de Venta con Descuento) * 100.", // New concept
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
};

export default calculadoraPrecios_es;
