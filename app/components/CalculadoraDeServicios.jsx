import { useState, useEffect } from 'react';


// Define brand colors based on user's request
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
  darkText: '#1e374f',
  green1: '#b1b599',
  green2: '#787a64',
  darkGreen: '#3a3d30',
  lightText: '#FFFFFF',
};

// Translations object for EN/ES
const translations = {
  es: {
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
  },
  en: { // Basic English translations, can be expanded
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
        taxRate: "<strong>VAT/Sales Tax:</strong> A tax added to your service price, which you collect for the government.",
      },
      allFormulas: {
         totalMonthlyCosts: "<strong>Total Operating Costs</strong> = Your Salary + Fixed Costs + Variable Costs",
         preTaxRevenue: "<strong>Revenue (Subtotal)</strong> = Operating Costs / (1 - (Profit Margin / 100))",
      }
    }
  }
};

// Helper function to format numbers as currency
const formatCurrency = (value) => {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return '$0.00';
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Reusable Input Field Component
const InputField = ({ label, value, onChange, placeholder = '0' }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" style={{color: brandColors.darkText}}>{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md"
        min="0"
        step="10"
        placeholder={placeholder}
        style={{borderColor: brandColors.accent1, focus: {ringColor: brandColors.primary, borderColor: brandColors.primary}}}
      />
    </div>
  </div>
);

// Reusable Percentage Input Field Component
const PercentageField = ({ label, value, onChange, placeholder = '7' }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" style={{color: brandColors.darkText}}>{label}</label>
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm block w-full pl-3 pr-8 sm:text-sm border-gray-300 rounded-md"
        min="0"
        step="1"
        placeholder={placeholder}
        style={{borderColor: brandColors.accent1, focus: {ringColor: brandColors.primary, borderColor: brandColors.primary}}}
      />
      <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
    </div>
  </div>
);


// Reusable Result Card Component
const ResultCard = ({ label, subLabel, value, formula, color, bgColor, isFinal = false, fullWidth = false }) => (
    <div className={`flex flex-col justify-between p-4 rounded-lg h-36 shadow-md ${fullWidth ? 'md:col-span-2' : ''}`} style={{ backgroundColor: bgColor }}>
        <div>
            <p className="font-semibold" style={{ color }}>{label}</p>
            <p className="text-xs" style={{ color, opacity: 0.8 }}>{subLabel}</p>
            <p className="text-xs font-mono mt-1" style={{ color, opacity: 0.6 }}>{formula}</p>
        </div>
        <p className={`text-right font-bold ${isFinal ? 'text-2xl' : 'text-xl'}`} style={{ color }}>
            {value}
        </p>
    </div>
);

// Special card for cost breakdown
const CostBreakdownCard = ({ t, values }) => (
    <div className="md:col-span-2 flex flex-col justify-center p-4 rounded-lg h-36 shadow-md" style={{ backgroundColor: brandColors.blue1 }}>
        <h4 className="font-semibold text-center mb-2" style={{ color: brandColors.darkText }}>{t.results.costBreakdown.title}</h4>
        <div className="flex justify-center items-center text-center text-sm font-bold" style={{ color: brandColors.darkText }}>
            <div className="px-2">
                <p>{t.results.costBreakdown.income}</p>
                <p>{formatCurrency(values.income)}</p>
            </div>
            <span className="text-xl mx-2">+</span>
            <div className="px-2">
                <p>{t.results.costBreakdown.fixed}</p>
                <p>{formatCurrency(values.fixed)}</p>
            </div>
            <span className="text-xl mx-2">+</span>
            <div className="px-2">
                <p>{t.results.costBreakdown.variable}</p>
                <p>{formatCurrency(values.variable)}</p>
            </div>
        </div>
         <p className="text-xs text-center font-mono mt-2" style={{ color: brandColors.darkText, opacity: 0.6 }}>= {t.results.totalMonthlyCosts.label}</p>
    </div>
);

// New card for rounded prices
const RoundedPricesCard = ({ t, values }) => (
    <div className="md:col-span-2 flex flex-col justify-center p-4 rounded-lg h-36 shadow-md" style={{ backgroundColor: brandColors.green2 }}>
        <h4 className="font-semibold text-center mb-2" style={{ color: brandColors.lightText }}>{t.results.roundedPrices.label}</h4>
        <p className="text-xs text-center mb-3" style={{ color: brandColors.lightText, opacity: 0.8 }}>{t.results.roundedPrices.subLabel}</p>
        <div className="flex justify-around items-center text-center" style={{ color: brandColors.lightText }}>
            <div>
                <p className="text-2xl font-bold">{formatCurrency(values.withTax)}</p>
                <p className="text-sm font-normal">{t.results.roundedPrices.withTax}</p>
            </div>
            <div>
                <p className="text-2xl font-bold">{formatCurrency(values.noTax)}</p>
                <p className="text-sm font-normal">{t.results.roundedPrices.noTax}</p>
            </div>
        </div>
    </div>
);


// Main Calculator Component
const ServiceCalculator = ({ t }) => {
  const [income, setIncome] = useState('');
  const [hours, setHours] = useState('');
  const [fixedCosts, setFixedCosts] = useState('');
  const [variableCosts, setVariableCosts] = useState('');
  const [profitMargin, setProfitMargin] = useState('');
  const [taxRate, setTaxRate] = useState('7'); // Default to 7% for ITBMS

  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const numIncome = parseFloat(income || 0);
    const numHours = parseFloat(hours || 0);
    const numFixed = parseFloat(fixedCosts || 0);
    const numVariable = parseFloat(variableCosts || 0);
    const numProfitMargin = parseFloat(profitMargin || 0);
    const numTaxRate = parseFloat(taxRate || 0);

    if (numHours <= 0) {
      setError(t.error);
      setResults(null);
      return;
    }
    setError('');

    const totalMonthlyCosts = numIncome + numFixed + numVariable;
    const preTaxRevenue = numProfitMargin < 100 ? totalMonthlyCosts / (1 - (numProfitMargin / 100)) : totalMonthlyCosts;
    
    const taxAmount = preTaxRevenue * (numTaxRate / 100);
    const totalBilling = preTaxRevenue + taxAmount;
    
    const requiredProfit = preTaxRevenue - totalMonthlyCosts;
    const costPerHour = totalMonthlyCosts / numHours;
    const pricePerHourNoTax = preTaxRevenue / numHours;
    const pricePerHourWithTax = totalBilling / numHours;
    const pricePerHourHalfHours = totalBilling / (numHours / 2);

    // Rounding calculations
    const roundedPriceWithTax = Math.ceil(pricePerHourWithTax);
    const roundedPriceNoTax = Math.ceil(pricePerHourNoTax);

    setResults({
      hours: numHours,
      breakdown: { income: numIncome, fixed: numFixed, variable: numVariable },
      totalMonthlyCosts,
      costPerHour,
      requiredProfit,
      preTaxRevenue,
      taxAmount,
      totalBilling,
      pricePerHourNoTax,
      pricePerHourWithTax,
      pricePerHourHalfHours,
      roundedPrices: {
          withTax: roundedPriceWithTax,
          noTax: roundedPriceNoTax,
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-2 p-6 rounded-lg shadow-xl" style={{backgroundColor: brandColors.lightText}}>
        <h3 className="text-2xl font-bold mb-6" style={{ color: brandColors.primary }}>{t.inputsTitle}</h3>
        <InputField label={t.inputs.desiredMonthlyIncome} value={income} onChange={setIncome} />
        <InputField label={t.inputs.fixedCosts} value={fixedCosts} onChange={setFixedCosts} />
        <InputField label={t.inputs.variableCosts} value={variableCosts} onChange={setVariableCosts} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={{color: brandColors.darkText}}>{t.inputs.monthlyHours}</label>
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md"
              min="1"
              placeholder="160"
              style={{borderColor: brandColors.accent1}}
            />
          </div>
          <PercentageField label={t.inputs.profitMargin} value={profitMargin} onChange={setProfitMargin} placeholder="15" />
        </div>
        <div className="mt-4">
            <PercentageField label={t.inputs.taxRate} value={taxRate} onChange={setTaxRate} />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-6 py-3 px-4 rounded-lg text-white font-bold text-lg transition duration-300 ease-in-out transform hover:scale-105"
          style={{ backgroundColor: brandColors.primary, boxShadow: `0 4px 14px 0 ${brandColors.accent2}` }}
        >
          {t.calculateButton}
        </button>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>

      {/* Results Section */}
      <div className="lg:col-span-3 p-6 rounded-lg" style={{ backgroundColor: brandColors.lightGray2 }}>
        <h3 className="text-2xl font-bold mb-6" style={{ color: brandColors.primary }}>{t.resultsTitle}</h3>
        {results ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CostBreakdownCard t={t} values={results.breakdown} />
            <ResultCard label={t.results.totalMonthlyCosts.label} subLabel={t.results.totalMonthlyCosts.subLabel} value={formatCurrency(results.totalMonthlyCosts)} formula={t.results.totalMonthlyCosts.formula} color={brandColors.darkText} bgColor={brandColors.blue1} />
            <ResultCard label={t.results.costPerHour.label} subLabel={`${t.results.costPerHour.subLabel} ${results.hours}h`} value={formatCurrency(results.costPerHour)} formula={t.results.costPerHour.formula} color={brandColors.darkText} bgColor={brandColors.blue1} />
            <ResultCard label={t.results.preTaxRevenue.label} subLabel={t.results.preTaxRevenue.subLabel} value={formatCurrency(results.preTaxRevenue)} formula={t.results.preTaxRevenue.formula} color={brandColors.darkGreen} bgColor={brandColors.green1} />
            <ResultCard label={t.results.requiredProfit.label} subLabel={t.results.requiredProfit.subLabel} value={formatCurrency(results.requiredProfit)} formula={t.results.requiredProfit.formula} color={brandColors.darkGreen} bgColor={brandColors.green1} />
            <ResultCard label={t.results.taxAmount.label} subLabel={t.results.taxAmount.subLabel} value={formatCurrency(results.taxAmount)} formula={t.results.taxAmount.formula} color={brandColors.darkText} bgColor={brandColors.lightGray3} />
            <ResultCard label={t.results.totalBilling.label} subLabel={t.results.totalBilling.subLabel} value={formatCurrency(results.totalBilling)} formula={t.results.totalBilling.formula} color={brandColors.darkText} bgColor={brandColors.lightGray3} />
            
            <ResultCard label={t.results.pricePerHourWithTax.label} subLabel={t.results.pricePerHourWithTax.subLabel} value={formatCurrency(results.pricePerHourWithTax)} formula={t.results.pricePerHourWithTax.formula} color={brandColors.lightText} bgColor={brandColors.primary} isFinal={true} />
            <ResultCard label={t.results.pricePerHourHalfHours.label} subLabel={t.results.pricePerHourHalfHours.subLabel} value={formatCurrency(results.pricePerHourHalfHours)} formula={t.results.pricePerHourHalfHours.formula} color={brandColors.lightText} bgColor={brandColors.secondary} />
            <ResultCard label={t.results.pricePerHourNoTax.label} subLabel={t.results.pricePerHourNoTax.subLabel} value={formatCurrency(results.pricePerHourNoTax)} formula={t.results.pricePerHourNoTax.formula} color={brandColors.lightText} bgColor={brandColors.blue2} />
            
            <RoundedPricesCard t={t} values={results.roundedPrices} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <p className="text-center text-lg" style={{color: brandColors.darkText}}>{t.guidance}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Collapsible Footer Section Component
const CollapsibleSection = ({ title, children, isOpen, onToggle }) => (
    <div className="border bg-white rounded-lg mb-4 shadow-md">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center p-4 focus:outline-none"
        >
            <h4 className="text-lg font-semibold" style={{ color: brandColors.primary }}>{title}</h4>
            <span className="transform transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <svg className="w-6 h-6" style={{color: brandColors.secondary}} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
        </button>
        {isOpen && (
            <div className="p-4 border-t" style={{borderColor: brandColors.lightGray1}}>
                {children}
            </div>
        )}
    </div>
);


// Main App Component
export default function CalculadoraDeServicios() {
  const [language, setLanguage] = useState('es');
  const [openSection, setOpenSection] = useState(null);
  const t = translations[language];

  // Firebase initialization boilerplate
  // useEffect(() => {
  //   const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
  //   if (Object.keys(firebaseConfig).length > 0) {
  //     const app = initializeApp(firebaseConfig);
  //     const auth = getAuth(app);
  //     const signIn = async () => {
  //       try {
  //         if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
  //           await signInWithCustomToken(auth, __initial_auth_token);
  //         } else {
  //           await signInAnonymously(auth);
  //         }
  //       } catch (error) {
  //         console.error("Firebase auth error:", error);
  //       }
  //     };
  //     signIn();
  //   }
  // }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <div className="min-h-screen p-4 sm:p-6 md:p-8" style={{ backgroundColor: brandColors.lightGray2, fontFamily: 'Albert Sans, sans-serif' }}>
        {/* Header */}
        <header className="text-center mb-8 relative">
          <div className="flex justify-between items-center">
              <div className="flex-1"></div>
              <div className="flex-1">
                  <h1 className="text-3xl font-extrabold whitespace-nowrap" style={{ color: brandColors.primary }}>{t.mainTitle}</h1>
                  <p className="text-md" style={{ color: brandColors.darkText }}>{t.subtitle}</p>
              </div>
              <div className="flex-1 flex justify-end">
                  <div className="flex items-center rounded-full p-1" style={{ backgroundColor: brandColors.lightGray3 }}>
                      <button
                          onClick={() => setLanguage('es')}
                          className={`py-1 px-4 rounded-full text-sm font-bold transition-all duration-300 ${language === 'es' ? 'shadow' : ''}`}
                          style={{
                              backgroundColor: language === 'es' ? brandColors.primary : 'transparent',
                              color: language === 'es' ? brandColors.lightText : brandColors.darkText,
                          }}
                      >
                          {t.languageToggle.es}
                      </button>
                      <button
                          onClick={() => setLanguage('en')}
                          className={`py-1 px-4 rounded-full text-sm font-bold transition-all duration-300 ${language === 'en' ? 'shadow' : ''}`}
                          style={{
                              backgroundColor: language === 'en' ? brandColors.primary : 'transparent',
                              color: language === 'en' ? brandColors.lightText : brandColors.darkText,
                          }}
                      >
                          {t.languageToggle.en}
                      </button>
                  </div>
              </div>
          </div>
        </header>

        {/* Calculator Content */}
        <main>
          <ServiceCalculator t={t} />
        </main>

        {/* Footer with Concepts and Formulas */}
        <footer className="max-w-7xl mx-auto mt-12 text-center">
            <div className="space-y-4">
                <CollapsibleSection title={t.footer.conceptsTitle} isOpen={openSection === 'concepts'} onToggle={() => toggleSection('concepts')}>
                    <div className="space-y-4 text-left">
                        {Object.values(t.footer.allConcepts).map((value, index) => (
                            <p key={index} className="text-sm" style={{color: brandColors.darkText}} dangerouslySetInnerHTML={{ __html: value }} />
                        ))}
                    </div>
                </CollapsibleSection>
                <CollapsibleSection title={t.footer.formulasTitle} isOpen={openSection === 'formulas'} onToggle={() => toggleSection('formulas')}>
                    <div className="space-y-3 text-left">
                        {Object.values(t.footer.allFormulas).map((value, index) => (
                            <div key={index} className="p-3 rounded-md text-sm font-mono" style={{ backgroundColor: brandColors.lightGray1, color: brandColors.darkText }} dangerouslySetInnerHTML={{ __html: value }} />
                        ))}
                    </div>
                </CollapsibleSection>
            </div>
          
          <p className="text-xs text-gray-500 mt-8">{t.footer.disclaimer}</p>
        </footer>
      </div>
    </>
  );
}