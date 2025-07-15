
const calculadoraServicios_es = {
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
        taxRate: "ITBMS (%)",
    },
    calculateButton: "Calcular Tarifa",
    resultsTitle: "Resultados Detallados Mensuales",
    results: {
        costBreakdown: {
            title: "Desglose de Costos Operativos",
            income: "Tu Salario",
            fixed: "Gastos Fijos",
            variable: "Gastos Variables"
        },
        totalMonthlyCosts: { label: "Costos Operativos Totales", subLabel: "Tu Salario + Gastos", formula: "Salario + Fijos + Variables" },
        costPerHour: { label: "Costo Real por Hora", subLabel: "basado en", formula: "Costos Totales / Horas" },
        requiredProfit: { label: "Ganancia Neta del Negocio", subLabel: "Margen para crecimiento", formula: "Facturación - Costos Totales" },
        preTaxRevenue: { label: "Facturación (Subtotal)", subLabel: "Antes de ITBMS", formula: "Costos / (1 - % Margen)" },
        taxAmount: { label: "Monto de ITBMS", subLabel: "Impuesto sobre el servicio", formula: "Subtotal * % ITBMS" },
        totalBilling: { label: "Facturación Total", subLabel: "Con ITBMS incluido", formula: "Subtotal + ITBMS" },
        pricePerHourNoTax: { label: "PRECIO POR HORA", subLabel: "Subtotal (sin ITBMS)", formula: "Subtotal / Horas" },
        pricePerHourWithTax: { label: "PRECIO FINAL POR HORA", subLabel: "A facturar al cliente (con impuestos incluidos)", formula: "Fact. Total / Horas" },
        pricePerHourHalfHours: { label: "PRECIO FACTURANDO LA MITAD DE LAS HORAS", subLabel: "Escenario de riesgo", formula: "Fact. Total / (Horas / 2)" },
        roundedPrices: {
            label: "PRECIOS SUGERIDOS (REDONDEADOS)",
            subLabel: "Para cotizar al cliente",
            withTax: "Con ITBMS",
            noTax: "Sin ITBMS",
        },
    },
    guidance: "Ingresa tus datos y haz clic en 'Calcular' para ver los resultados.",
    error: "Por favor, ingresa un número válido de horas (mayor a 0).",
    footer: {
        disclaimer: "Esta calculadora es una herramienta de estimación. Consulta con un profesional financiero para obtener asesoramiento personalizado.",
        conceptsTitle: "Conceptos Clave",
        formulasTitle: "Fórmulas Utilizadas",
        allConcepts: {
            desiredMonthlyIncome: "<strong>Tu Ingreso Mensual Deseado:</strong> Es el salario neto que quieres pagarte a ti mismo. <strong>Es crucial tratar tu salario como un costo fijo del negocio.</strong> Esto te obliga a que la empresa sea rentable por sí misma, más allá de solo pagarte. Separa la salud financiera del negocio de tus finanzas personales.",
            monthlyHours: "<strong>Horas Facturables al Mes:</strong> El número total de horas que planeas vender a tus clientes. No incluyas horas administrativas, de venta o capacitación.",
            fixedCosts: "<strong>Gastos Fijos:</strong> Costos que no cambian sin importar cuánto trabajes (ej. alquiler, suscripciones a software, internet, contabilidad).",
            variableCosts: "<strong>Gastos Variables:</strong> Costos que cambian según el volumen de trabajo (ej. materiales para un proyecto, transporte a reuniones, comisiones).",
            profitMargin: "<strong>Margen de Ganancia Deseado:</strong> Un porcentaje adicional sobre tus costos que se reinvierte en el negocio para crecimiento, ahorros o bonos. Es la ganancia real de la empresa y una decisión estratégica que tú defines.",
            taxRate: "<strong>ITBMS:</strong> Impuesto de Transferencia de Bienes Muebles y Servicios. En Panamá, es el 7% que se añade al precio de tus servicios y que luego debes declarar.",
            costPerHour: "<strong>Costo Real por Hora:</strong> Lo que te cuesta operar tu negocio cada hora facturable. Si cobras menos que esto, pierdes dinero.",
            pricePerHourWithTax: "<strong>Precio Final por Hora:</strong> La tarifa final que debes cobrar al cliente para cubrir todos los costos, tu ganancia y el ITBMS."
        },
        allFormulas: {
            totalMonthlyCosts: "<strong>Costos Operativos Totales</strong> = Tu Salario + Gastos Fijos + Gastos Variables",
            preTaxRevenue: "<strong>Facturación (Subtotal)</strong> = Costos Operativos / (1 - (Margen de Ganancia / 100))",
            taxAmount: "<strong>Monto de ITBMS</strong> = Facturación (Subtotal) * (ITBMS / 100)",
            totalBilling: "<strong>Facturación Total</strong> = Facturación (Subtotal) + Monto de ITBMS",
            pricePerHourNoTax: "<strong>Precio por Hora (sin ITBMS)</strong> = Facturación (Subtotal) / Horas Facturables",
            pricePerHourWithTax: "<strong>Precio Final por Hora</strong> = Facturación Total / Horas Facturables",
            pricePerHourHalfHours: "<strong>Precio Facturando Mitad de Horas</strong> = Facturación Total / (Horas Facturables / 2)",
        }
    }
}

export default calculadoraServicios_es;