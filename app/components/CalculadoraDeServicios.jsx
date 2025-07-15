import { useState, useEffect } from 'react';
import brandColors from '../styles/brandColors';
import { InputField } from './InputField';
import { LanguageSelector } from './LanguageSelector';

// Translations object for EN/ES
import { translations } from '../assets/localization/translations';

// Helper function to format numbers as currency
const formatCurrency = (value) => {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return '$0.00';
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Reusable Percentage Input Field Component
const PercentageField = ({ label, value, onChange, placeholder = '7' }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1" style={{ color: brandColors.darkText }}>{label}</label>
    <div className="relative">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow-sm block w-full pl-3 pr-8 sm:text-sm border-gray-300 rounded-md"
        min="0"
        step="1"
        placeholder={placeholder}
        style={{ borderColor: brandColors.accent1, focus: { ringColor: brandColors.primary, borderColor: brandColors.primary } }}
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
      <div className="lg:col-span-2 p-6 rounded-lg shadow-xl" style={{ backgroundColor: brandColors.lightText }}>
        <h3 className="text-2xl font-bold mb-6" style={{ color: brandColors.primary }}>{t.inputsTitle}</h3>
        <InputField label={t.inputs.desiredMonthlyIncome} value={income} onChange={setIncome} hasPrefix={true} prefix="$" />
        <InputField label={t.inputs.fixedCosts} value={fixedCosts} onChange={setFixedCosts} hasPrefix={true} prefix="$" />
        <InputField label={t.inputs.variableCosts} value={variableCosts} onChange={setVariableCosts} hasPrefix={true} prefix="$" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label={t.inputs.monthlyHours} value={hours} onChange={setHours} />
          <InputField label={t.inputs.profitMargin} value={profitMargin} onChange={setProfitMargin} placeholder="15" hasSuffix={true} suffix="%" />
        </div>
        <div className="mt-4">
          <InputField label={t.inputs.taxRate} value={taxRate} onChange={setTaxRate} placeholder="7" hasSuffix={true} suffix="%" />
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
            <p className="text-center text-lg" style={{ color: brandColors.darkText }}>{t.guidance}</p>
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
        <svg className="w-6 h-6" style={{ color: brandColors.secondary }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    {isOpen && (
      <div className="p-4 border-t" style={{ borderColor: brandColors.lightGray1 }}>
        {children}
      </div>
    )}
  </div>
);


// Main App Component
function CalculadoraDeServicios() {
  const [language, setLanguage] = useState('es');
  const [openSection, setOpenSection] = useState(null);
  const t = translations[language].consultoria;

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
              <LanguageSelector language={language} setLanguage={setLanguage} />
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
                  <p key={index} className="text-sm" style={{ color: brandColors.darkText }} dangerouslySetInnerHTML={{ __html: value }} />
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

export default CalculadoraDeServicios;
