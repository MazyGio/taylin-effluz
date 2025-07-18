const calculadoraUtilidad_es = {
    mainTitle: "Calculadora de utilidad después de comisiones",
    subtitle1: "Desarrollado por Taylin Luzcando",
    subtitle2_line1: "Calcula tu rentabilidad real al vender en plataformas online,",
    subtitle2_line2: "usar pasarelas de pago y vendedores (USD$)",
    languageToggle: "English",
    calculator: {
        title: "Entradas de la Calculadora",
        inputs: {
            productCost: "Costo del Producto",
            sellingPrice: "Precio de Venta",
            expectedMargin: "Margen de Venta Actual (%)",
            paymentCommissionPercentage: "Comisión de Forma de Pago (%)",
            paymentCommissionFixed: "Comisión Fija de Forma de Pago ($)",
            websiteCommissionPercentage: "Comisión de la Página Web (%)",
            sellerCommissionPercentage: "Comisión del Vendedor (%)",
            otherCommissions: "Otras Comisiones ($)",
            taxRate: "Impuesto (%)",
            taxIncludedQuestion: "¿El precio de venta ya incluye el impuesto?",
            taxIncludedYes: "Sí",
            taxIncludedNo: "No",
        },
        outputs: {
            resultsTitle: "Resultados",
            sellingPricePreTax: "Precio de Venta (sin impuesto)",
            taxAmount: "Monto del Impuesto",
            sellingPriceWithTax: "Precio de Venta Final (con impuesto)",

            scenarioWithoutCommissions: "Análisis Sin Comisiones",
            expectedProfit: "Utilidad Actual (antes de comisiones)",
            expectedMargin: "Margen Actual (antes de comisiones)",

            commissionBreakdownTitle: "Desglose de Comisiones",
            paymentCommissionAmount: "Comisión de Forma de Pago (%)",
            paymentCommissionFixedAmount: "Comisión Fija de Forma de Pago ($)",
            websiteCommissionAmount: "Comisión de la Página Web (%)",
            sellerCommissionAmount: "Comisión del Vendedor (%)",
            otherCommissionsAmount: "Otras Comisiones ($)",
            totalCommissions: "Total de Comisiones",

            scenarioWithCommissions: "Análisis Con Comisiones",
            profit: "Utilidad Final",
            profitMargin: "Margen de Utilidad Final (%)",

            variationAnalysis: "Análisis de Variación",
            variationAnalysisText: "Las comisiones de venta reducen tu utilidad en <strong style='color:#4f0839'>{profitDifference}</strong>, lo que representa una disminución de <strong style='color:#4f0839'>{marginDifference}</strong> en tu margen de ganancia.",
        },
        autoCalculateMarginLabel: "No sé cuánto es mi margen",
        inputGuidance: "Si algún dato no aplica, coloca 0.",
        mandatoryChoiceGuidance: "Selecciona una opción para el impuesto.",
        resultsPlaceholder: "Introduce los valores y haz clic en Calcular."
    },
    footer: {
        disclaimer: "El desarrollo de esta calculadora y su código son propiedad de Effluz S.A. Está prohibida su reproducción total o parcial. Esta calculadora es una herramienta de estimación, no nos hacemos responsables por los usos que le den a estos cálculos.",
        conceptsTitle: "Conceptos Clave",
        formulasTitle: "Fórmulas Utilizadas",
        showConcepts: "Mostrar Conceptos",
        hideConcepts: "Ocultar Conceptos",
        showFormulas: "Mostrar Fórmulas",
        hideFormulas: "Ocultar Fórmulas",
        concepts: {
            productCost: "Costo del Producto: El valor monetario total para adquirir o producir una unidad del producto.",
            expectedProfit: "Utilidad Actual (antes de comisiones): La ganancia que se esperaba obtener basándose únicamente en el precio de venta y el costo, antes de deducir cualquier comisión.",
            finalProfit: "Utilidad Final: La ganancia neta real que te queda después de restar el costo del producto y todas las comisiones del precio de venta (sin impuesto).",
            profitDifference: "Diferencia de Utilidad: El monto exacto de dinero que las comisiones reducen de tu utilidad prevista. Es el costo real de usar la plataforma.",
            marginDifference: "Diferencia de Margen: Cuántos puntos porcentuales de margen de ganancia pierdes debido a las comisiones. Muestra el impacto directo en tu rentabilidad.",
        },
        formulas: {
            expectedProfit: "<strong>Utilidad Actual (antes de comisiones)</strong> = Precio de Venta (sin impuesto) - Costo del Producto",
            totalCommissions: "<strong>Total de Comisiones</strong> = (Comisión Pago %) + (Comisión Pago Fija) + (Comisión Web %) + (Comisión Vendedor %) + (Otras Comisiones)",
            finalProfit: "<strong>Utilidad Final</strong> = Utilidad Actual (antes de comisiones) - Total de Comisiones",
            profitDifference: "<strong>Diferencia de Utilidad</strong> = Utilidad Actual (antes de comisiones) - Utilidad Final",
            finalMargin: "<strong>Margen de Utilidad Final (%)</strong> = (Utilidad Final / Precio de Venta (sin impuesto)) * 100",
            marginDifference: "<strong>Diferencia de Margen (%)</strong> = Margen de Venta Actual (%) - Margen de Utilidad Final (%)",
        }
    }
};

export default calculadoraUtilidad_es;