
const calculadoraServicios_es = {
    title: "Calculadora para Servicios",
    mainTitle: "Calculadora de Precios para Consultorías",
    subtitle: "Define tu tarifa por hora basada en tus metas y costos (USD$)",
    languageToggle: { es: "ES", en: "EN" },
    inputsTitle: "1. Define tus Metas y Costos Mensuales",
    inputs: {
        desiredMonthlyIncome: "Tu Ingreso Mensual Deseado (Salario Neto)",
        monthlyHours: "Horas Facturables al Mes",
        fixedCosts: "Gastos Fijos Mensuales",
        variableCosts: "Gastos Variables Mensuales",
        profitMargin: "Margen de Ganancia Deseado del Negocio (%)",
        taxRate: "Impuesto (tipo ITBMS) (%)",
        includeISR: "Incluir cálculo de Impuesto Sobre la Renta (Panamá)",
        includeCSS: "Incluir cálculo de Seguro Social (IVM - Panamá)",
        includeSalud: "Incluir afiliación voluntaria de Seguro Social (Salud - Panamá)",
    },
    calculateButton: "Calcular",
    resultsTitle: "Resultados Detallados Mensuales",
    results: {
        sectionTitleCosts: "Costos Operativos",
        salaryAsCostExplanation: "Tu salario es el costo más importante. El negocio debe poder pagártelo y además ser rentable.",
        sectionTitleNoTax: "Ingresos y Ganancias (sin Impuesto)",
        sectionTitleWithTax: "Totales a Facturar (con Impuesto)",
        sectionTitleISR: "Estimación de Impuesto Sobre la Renta (Anual)",
        sectionTitleCSS: "Estimación de Seguro Social (Mensual)",
        cssExplanation: "Este es el aporte obligatorio para Invalidez, Vejez y Muerte (IVM).",
        saludExplanation: "Este es el aporte voluntario para Enfermedad y Maternidad.",
        sectionTitleSuggested: "Precios Finales Sugeridos (Redondeados hacia arriba)",
  
        totalMonthlyCosts: { label: "Costos Operativos Totales", formula: "Salario + Gastos Fijos + Gastos Variables" },
        costPerHour: { label: "Costo Real por Hora", subLabel: "basado en", formula: "Costos Operativos Totales / Horas Facturables" },
        
        preTaxRevenue: { label: "Ingresos Requeridos (Subtotal)", formula: "Costos Operativos / (1 - % Margen)" },
        requiredProfit: { label: "Ganancia Neta del Negocio", formula: "Ingresos Requeridos - Costos Operativos" },
        pricePerHourNoTax: { label: "Precio por Hora (sin Impuesto)", formula: "Ingresos Requeridos / Horas Facturables" },
  
        taxAmount: { label: "Monto de Impuesto (tipo ITBMS)", formula: "Ingresos Requeridos * % Impuesto" },
        totalBilling: { label: "Ingresos Totales", formula: "Ingresos Requeridos + Monto de Impuesto" },
        pricePerHourWithTax: { label: "Precio Final por Hora (con Impuesto)", formula: "Ingresos Totales / Horas Facturables" },
        
        annualTaxableIncome: { label: "Ingreso Gravable Anual", formula: "(Tu Salario + Ganancia Neta) * 12" },
        taxBracket: { label: "Tramo Impositivo (DGI)", formula: "" },
        taxableSurplus: { label: "Monto Excedente", formula: "Ingreso Gravable Anual - Base del Tramo" },
        estimatedISR: { label: "Impuesto Sobre la Renta Anual a Pagar", subLabel: "(Estimado sin deducciones)", formula: "{formula}" },
        annualIncomeAfterISR: { label: "Ingreso Anual Neto Final", subLabel: "Tu ingreso final (después de ISR y Seguro Social)", formula: "Ingreso Gravable Anual - Impuesto Sobre la Renta - Seguro Social Anual" },
  
        cssBaseIncome: { label: "Ingreso Base de Cotización (52%)", formula: "(Tu Salario + Ganancia Neta) * 52%" },
        cssPayment: { label: "Cuota Mensual a Pagar (IVM)", subLabel: "Aporte obligatorio para jubilación", formula: "Ingreso Base * 9.36%" },
        
        saludBaseIncome: { label: "Ingreso Base de Cotización (Salud)", formula: "Max({minBase}, {monthlyIncome})" },
        saludPayment: { label: "Cuota de Seguro Social (Salud)", subLabel: "Aporte voluntario para salud", formula: "Ingreso Base (Salud) * 8.5%" },
        totalCssPayment: { label: "Total Cuotas de Seguro Social", subLabel: "Suma de IVM y Salud", formula: "Cuota IVM + Cuota Salud" },
  
        roundedPriceNoTax: { label: "Precio Sugerido por Hora (sin Impuesto)" },
        roundedPriceWithTax: { 
            label: "Precio Sugerido por Hora (con Impuesto)", 
            basePriceLabel: "Para lograr este precio, factura un subtotal de:"
        },
        finalAnalysis: {
            title: "Análisis de Resultados",
            p1: "Basado en tus {hours} horas facturables al mes, tu tarifa horaria sugerida de {priceWithTax} (con impuesto) es una guía para cubrir tus necesidades financieras.",
            p2: "Este precio te permite cubrir {totalCosts} en costos operativos mensuales (que <strong>ya incluyen tu salario</strong> de {salary}), y además generar una <strong>ganancia neta mensual de {profit} para el negocio</strong>, la cual es aparte de tu salario.",
            p3: "<strong>Importante:</strong> Para una declaración precisa, es fundamental que te guíes con un contador público autorizado.",
            p4: "Con esta estimación, de un ingreso anual bruto de {annualGrossIncome}, se restarían {annualExpenses} en impuestos y seguro social, resultando en un ingreso neto final de {annualNetIncome}."
        }
    },
    guidance: "Ingresa tus datos y haz clic en 'Calcular' para ver los resultados.",
    error: "Por favor, ingresa un número válido de horas (mayor a 0).",
    footer: {
        disclaimer: "El desarrollo de esta calculadora y su código son propiedad de Effluz S.A. Está prohibida su reproducción total o parcial. Esta calculadora es una herramienta de estimación, no nos hacemos responsables por los usos que le den a estos cálculos. Desarrollada por Taylin Luzcando.",
        conceptsTitle: "Conceptos Clave",
        formulasTitle: "Fórmulas Utilizadas",
        showConcepts: "Mostrar Conceptos",
        hideConcepts: "Ocultar Conceptos",
        showFormulas: "Mostrar Fórmulas",
        hideFormulas: "Ocultar Fórmulas",
        allConcepts: {
            desiredMonthlyIncome: "Tu Ingreso Mensual Deseado: Es el salario neto que quieres pagarte a ti mismo. Es crucial tratar tu salario como un costo fijo del negocio. Esto te obliga a que la empresa sea rentable por sí misma, más allá de solo pagarte. Separa la salud financiera del negocio de tus finanzas personales.",
            monthlyHours: "Horas Facturables al Mes: El número total de horas que planeas vender a tus clientes. No incluyas horas administrativas, de venta o capacitación.",
            fixedCosts: "Gastos Fijos: Costos que no cambian sin importar cuánto trabajes (ej. alquiler, suscripciones a software, internet, contabilidad).",
            variableCosts: "Gastos Variables: Costos que cambian según el volumen de trabajo (ej. materiales para un proyecto, transporte a reuniones, comisiones).",
            profitMargin: "Margen de Ganancia Deseado: Un porcentaje adicional sobre tus costos que se reinvierte en el negocio para crecimiento, ahorros o bonos. Es la ganancia real de la empresa y una decisión estratégica que tú defines.",
            taxRate: "ITBMS: Impuesto de Transferencia de Bienes Muebles y Servicios. En Panamá, es el 7% que se añade al precio de tus servicios y que luego debes declarar.",
            costPerHour: "Costo Real por Hora: Lo que te cuesta operar tu negocio cada hora facturable. Si cobras menos que esto, pierdes dinero.",
            pricePerHourWithTax: "Precio Final por Hora: La tarifa final que debes cobrar al cliente para cubrir todos los costos, tu ganancia y el ITBMS."
        },
        allFormulas: {
            totalMonthlyCosts: "Costos Operativos Totales = Tu Salario + Gastos Fijos + Gastos Variables",
            preTaxRevenue: "Facturación (Subtotal) = Costos Operativos / (1 - (Margen de Ganancia / 100))",
            taxAmount: "Monto de ITBMS = Facturación (Subtotal) * (ITBMS / 100)",
            totalBilling: "Facturación Total = Facturación (Subtotal) + Monto de ITBMS",
            pricePerHourNoTax: "Precio por Hora (sin ITBMS) = Facturación (Subtotal) / Horas Facturables",
            pricePerHourWithTax: "Precio Final por Hora = Facturación Total / Horas Facturables",
            pricePerHourHalfHours: "Precio Facturando Mitad de Horas = Facturación Total / (Horas Facturables / 2)",
        }
    }
}

export default calculadoraServicios_es;