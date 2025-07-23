import { useState, useEffect } from 'react';
import { InputField } from './InputField';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../assets/localization/translations';
import { formatCurrency } from '../utils/formatter';

// New Result Row Component
const ResultRow = ({ label, subLabel, value, formula, formulaNumbers, isHighlighted = false, highlightColor, textColor }) => (
  <div className={`flex justify-between items-center py-3 px-4 rounded-md bg-${highlightColor ? `${highlightColor}` : (isHighlighted ? 'lightGray1' : 'transparent')} ${isHighlighted ? 'shadow-sm' : ''}`}>
    <div>
      <p className="text-base font-semibold text-darkText">{label}</p>
      {subLabel && <p className="text-xs text-darkText opacity-80">{subLabel}</p>}
      <p className="text-sm font-mono mt-1 text-darkText opacity-60">{formula}</p>
      {formulaNumbers && <p className="text-sm font-mono mt-1 text-darkText opacity-60">{formulaNumbers}</p>}
    </div>
    <p className={`font-bold text-2xl ml-4 text-${textColor ? textColor : (isHighlighted ? 'primary' : 'darkText')}`}>{value}</p>
  </div>
);

// New Section Title Component
const SectionTitle = ({ title }) => (
  <div className="mt-6 mb-2">
    <h4 className="text-lg font-bold p-2 rounded-md text-lightText bg-darkText">{title}</h4>
  </div>
);

// New Suggested Price Card
const SuggestedPriceCard = ({ t, title, price, basePrice, basePriceLabel, bgColor, textColor }) => (
  <div className={`p-4 rounded-lg shadow-lg flex flex-col items-center justify-center text-center h-40 bg-${bgColor} text-${textColor}`}>
    <h5 className="font-bold text-base text-center">{title}</h5>
    <p className="text-4xl font-extrabold my-2">{formatCurrency(price, 0)}</p>
    {basePrice && (
      <div className={`mt-2 text-xs opacity-80 bg-opacity-10 p-1 rounded-md`}>
        <p>{basePriceLabel}</p>
        <p className="font-bold">{formatCurrency(basePrice)}</p>
      </div>
    )}
  </div>
);

// Final Analysis Component
const FinalAnalysis = ({ results }) => {
  const { language } = useLanguage();
  const t = translations[language].consultoria;

  if (!results) return null;

  const p1 = t.results.finalAnalysis.p1
    .replace('{hours}', `<strong>${results.hours}</strong>`)
    .replace('{priceWithTax}', `<strong>${formatCurrency(results.roundedPriceWithTax, 0)}</strong>`);

  const p2 = t.results.finalAnalysis.p2
    .replace('{totalCosts}', `<strong>${formatCurrency(results.totalMonthlyCosts)}</strong>`)
    .replace('{salary}', `<strong>${formatCurrency(results.income)}</strong>`)
    .replace('{profit}', `<strong>${formatCurrency(results.requiredProfit)}</strong>`);

  let p3 = '';
  if (results.cssResults || results.isrResults) {
    let cssPaymentText = results.cssResults ? `Se estima una cuota mensual de <strong>${formatCurrency(results.cssResults.cssPayment)}</strong> para el Seguro Social (IVM)` : '';
    let saludPaymentText = results.saludResults ? ` y <strong>${formatCurrency(results.saludResults.saludPayment)}</strong> para Seguro Social (Salud).` : '.';
    let isrText = results.isrResults ? ` El cálculo de Impuesto Sobre la Renta es una estimación que <strong>no incluye deducciones fiscales</strong>, esas dependen de tus gastos deducibles del ISR.` : '';
    p3 = cssPaymentText + saludPaymentText + isrText;
  }

  let p4 = '';
  if (results.isrResults) {
    p4 = t.results.finalAnalysis.p4
      .replace('{annualGrossIncome}', `<strong>${formatCurrency(results.isrResults.annualTaxableIncome)}</strong>`)
      .replace('{annualExpenses}', `<strong>${formatCurrency(results.isrResults.estimatedISR + results.isrResults.totalAnnualCSS)}</strong>`)
      .replace('{annualNetIncome}', `<strong>${formatCurrency(results.isrResults.annualIncomeAfterISR)}</strong>`);
  }

  return (
    <div className="mt-6">
      <SectionTitle title={t.results.finalAnalysis.title} />
      <div className="text-base text-justify p-4 bg-white rounded-md shadow-sm space-y-4">
        <p dangerouslySetInnerHTML={{ __html: p1 }} />
        <p dangerouslySetInnerHTML={{ __html: p2 }} />
        {p3 && <p dangerouslySetInnerHTML={{ __html: p3 }} />}
        <p dangerouslySetInnerHTML={{ __html: t.results.finalAnalysis.p3 }} />
        {p4 && <p dangerouslySetInnerHTML={{ __html: p4 }} />}
      </div>
    </div>
  );
};

// Main Calculator Component
const ServiceCalculator = () => {
  const { language } = useLanguage();
  const t = translations[language].consultoria;

  const [income, setIncome] = useState('');
  const [hours, setHours] = useState('');
  const [fixedCosts, setFixedCosts] = useState('');
  const [variableCosts, setVariableCosts] = useState('');
  const [profitMargin, setProfitMargin] = useState('');
  const [taxRate, setTaxRate] = useState('7');
  const [includeISR, setIncludeISR] = useState(false);
  const [includeCSS, setIncludeCSS] = useState(false);
  const [includeSalud, setIncludeSalud] = useState(false);

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

    const roundedPriceWithTax = Math.ceil(pricePerHourWithTax);
    const roundedPriceNoTax = Math.ceil(pricePerHourNoTax);

    const basePriceForRoundedWithTax = roundedPriceWithTax / (1 + (numTaxRate / 100));

    const monthlyTaxableIncome = numIncome + requiredProfit;

    // CSS Calculation
    let cssResults = null;
    if (includeCSS) {
      const cssBaseIncome = monthlyTaxableIncome * 0.52;
      const cssPayment = cssBaseIncome * 0.0936;
      cssResults = { cssBaseIncome, cssPayment };
    }

    // Salud Calculation
    let saludResults = null;
    if (includeSalud) {
      const saludBaseIncome = Math.max(800, monthlyTaxableIncome);
      const saludPayment = saludBaseIncome * 0.085;
      saludResults = { saludBaseIncome, saludPayment };
    }

    // ISR Calculation
    let isrResults = null;
    if (includeISR) {
      const annualTaxableIncome = monthlyTaxableIncome * 12;
      let estimatedISR = 0;
      let taxBracket = `0% (hasta $11,000)`;
      let taxableSurplus = 0;
      let taxableSurplusFormula = "No aplica";
      let isrFormula = "0";
      if (annualTaxableIncome > 11000) {
        if (annualTaxableIncome <= 50000) {
          taxableSurplus = annualTaxableIncome - 11000;
          estimatedISR = taxableSurplus * 0.15;
          taxBracket = `Aplicando 15% sobre excedente de $11,000`;
          taxableSurplusFormula = `${formatCurrency(annualTaxableIncome)} - $11,000`;
          isrFormula = `${formatCurrency(taxableSurplus)} * 15%`;
        } else {
          taxableSurplus = annualTaxableIncome - 50000;
          estimatedISR = 5850 + taxableSurplus * 0.25;
          taxBracket = `$5,850 + Aplicando 25% sobre excedente de $50,000`;
          taxableSurplusFormula = `${formatCurrency(annualTaxableIncome)} - $50,000`;
          isrFormula = `$5,850 + (${formatCurrency(taxableSurplus)} * 25%)`;
        }
      }
      const totalAnnualCSS = (cssResults?.cssPayment || 0) * 12 + (saludResults?.saludPayment || 0) * 12;
      const annualIncomeAfterISR = annualTaxableIncome - estimatedISR - totalAnnualCSS;
      isrResults = { annualTaxableIncome, taxBracket, taxableSurplus, taxableSurplusFormula, estimatedISR, isrFormula, annualIncomeAfterISR };
    }

    setResults({
      income: numIncome,
      hours: numHours,
      profitMargin: numProfitMargin,
      totalMonthlyCosts,
      costPerHour,
      requiredProfit,
      preTaxRevenue,
      taxAmount,
      totalBilling,
      pricePerHourNoTax,
      pricePerHourWithTax,
      roundedPriceWithTax,
      roundedPriceNoTax,
      basePriceForRoundedWithTax,
      isrResults,
      cssResults,
      saludResults,
    });
  };

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-2 p-6 rounded-lg shadow-xl bg-lightText">
        <h3 className="text-2xl font-bold mb-6 text-primary">{t.inputsTitle}</h3>
        <InputField label={t.inputs.desiredMonthlyIncome} value={income} onChange={setIncome} hasPrefix={true} prefix="$" tooltipText={t.footer.allConcepts.desiredMonthlyIncome} isTooltipLeft={true}/>
        <InputField label={t.inputs.fixedCosts} value={fixedCosts} onChange={setFixedCosts} hasPrefix={true} prefix="$" tooltipText={t.footer.allConcepts.fixedCosts} />
        <InputField label={t.inputs.variableCosts} value={variableCosts} onChange={setVariableCosts} hasPrefix={true} prefix="$" tooltipText={t.footer.allConcepts.variableCosts} />

        <div className="flex md:flex-row items-end gap-4">
          <div className="flex-1">
            <InputField label={t.inputs.monthlyHours} value={hours} onChange={setHours} placeholder="160" tooltipText={t.footer.allConcepts.monthlyHours} />
          </div>
          <div className="flex-1">
            <InputField label={t.inputs.profitMargin} value={profitMargin} onChange={setProfitMargin} placeholder="15" hasSuffix={true} suffix="%" tooltipText={t.footer.allConcepts.profitMargin} isTooltipLeft={true}/>
          </div>
        </div>
        <div className="mt-4">
          <InputField label={t.inputs.taxRate} value={taxRate} onChange={setTaxRate} placeholder="7" hasSuffix={true} suffix="%" tooltipText={t.footer.allConcepts.taxRate} />
        </div>

        {/* Checkboxes */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center">
            <input id="include-isr" type="checkbox" checked={includeISR} onChange={(e) => setIncludeISR(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
            <label htmlFor="include-isr" className="ml-2 block text-sm text-gray-900">{t.inputs.includeISR}</label>
          </div>
          <div className="flex items-center">
            <input id="include-css" type="checkbox" checked={includeCSS} onChange={(e) => setIncludeCSS(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
            <label htmlFor="include-css" className="ml-2 block text-sm text-gray-900">{t.inputs.includeCSS}</label>
          </div>
          <div className="flex items-center">
            <input id="include-salud" type="checkbox" checked={includeSalud} onChange={(e) => setIncludeSalud(e.target.checked)} className="h-4 w-4 rounded accent-primary" />
            <label htmlFor="include-salud" className="ml-2 block text-sm text-gray-900">{t.inputs.includeSalud}</label>
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-6 py-3 px-4 rounded-lg text-white font-bold text-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer bg-primary shadow-lg shadow-accent2"
        >
          {t.calculateButton}
        </button>
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </div>

      {/* Results Section */}
      <div className="lg:col-span-3 p-6 rounded-lg bg-lightGray1">
        <h3 className="text-2xl font-bold mb-6 text-primary">{t.resultsTitle}</h3>
        {results ? (
          <div className="space-y-4">
            <div>
              <SectionTitle title={t.results.sectionTitleCosts} />
              <p className="text-xs italic text-gray-600 px-4 mb-2">{t.results.salaryAsCostExplanation}</p>
              <ResultRow label={t.results.totalMonthlyCosts.label} value={formatCurrency(results.totalMonthlyCosts)} formula={t.results.totalMonthlyCosts.formula} formulaNumbers={`${formatCurrency(results.income, 0)} + ${formatCurrency(results.totalMonthlyCosts - results.income, 0)}`} />
              <ResultRow label={`${t.results.costPerHour.label} (${results.hours}h)`} value={formatCurrency(results.costPerHour)} formula={t.results.costPerHour.formula} formulaNumbers={`${formatCurrency(results.totalMonthlyCosts, 0)} / ${results.hours}`} isHighlighted={true} />
            </div>

            <div>
              <SectionTitle title={t.results.sectionTitleNoTax} />
              <ResultRow label={t.results.preTaxRevenue.label} value={formatCurrency(results.preTaxRevenue)} formula={t.results.preTaxRevenue.formula} formulaNumbers={`${formatCurrency(results.totalMonthlyCosts, 0)} / (1 - ${results.profitMargin || 0}%)`} />
              <ResultRow label={t.results.requiredProfit.label} value={formatCurrency(results.requiredProfit)} formula={t.results.requiredProfit.formula} formulaNumbers={`${formatCurrency(results.preTaxRevenue)} - ${formatCurrency(results.totalMonthlyCosts)}`} />
              <ResultRow label={t.results.pricePerHourNoTax.label} value={formatCurrency(results.pricePerHourNoTax)} formula={t.results.pricePerHourNoTax.formula} formulaNumbers={`${formatCurrency(results.preTaxRevenue)} / ${results.hours}`} isHighlighted={true} />
            </div>

            <div>
              <SectionTitle title={t.results.sectionTitleWithTax} />
              <ResultRow label={t.results.taxAmount.label} value={formatCurrency(results.taxAmount)} formula={t.results.taxAmount.formula} formulaNumbers={`${formatCurrency(results.preTaxRevenue)} * ${taxRate || 0}%`} />
              <ResultRow label={t.results.totalBilling.label} value={formatCurrency(results.totalBilling)} formula={t.results.totalBilling.formula} formulaNumbers={`${formatCurrency(results.preTaxRevenue)} + ${formatCurrency(results.taxAmount)}`} />
              <ResultRow label={t.results.pricePerHourWithTax.label} value={formatCurrency(results.pricePerHourWithTax)} formula={t.results.pricePerHourWithTax.formula} formulaNumbers={`${formatCurrency(results.totalBilling)} / ${results.hours}`} isHighlighted={true} />
            </div>

            {(results.cssResults || results.saludResults) && (
              <div>
                <SectionTitle title={t.results.sectionTitleCSS} />
                {results.cssResults && <>
                  <p className="text-xs italic text-gray-600 px-4 mb-2">{t.results.cssExplanation}</p>
                  <ResultRow label={t.results.cssBaseIncome.label} value={formatCurrency(results.cssResults.cssBaseIncome)} formula={t.results.cssBaseIncome.formula} formulaNumbers={`${formatCurrency(results.income, 0)} + ${formatCurrency(results.requiredProfit)} * 52%`} />
                  <ResultRow label={t.results.cssPayment.label} subLabel={t.results.cssPayment.subLabel} value={formatCurrency(results.cssResults.cssPayment)} formula={t.results.cssPayment.formula} formulaNumbers={`${formatCurrency(results.cssResults.cssBaseIncome)} * 9.36%`} isHighlighted={true} highlightColor={"blue1"} />
                </>}
                {results.saludResults && <div className="mt-4">
                  <ResultRow label={t.results.saludBaseIncome.label} subLabel={t.results.saludExplanation} value={formatCurrency(results.saludResults.saludBaseIncome)} formula={t.results.saludBaseIncome.formula.replace('{minBase}', formatCurrency(800)).replace('{monthlyIncome}', formatCurrency(results.income + results.requiredProfit))} />
                  <ResultRow label={t.results.saludPayment.label} subLabel={t.results.saludPayment.subLabel} value={formatCurrency(results.saludResults.saludPayment)} formula={t.results.saludPayment.formula} formulaNumbers={`${formatCurrency(results.saludResults.saludBaseIncome)} * 8.5%`} isHighlighted={true} highlightColor={"blue1"} />
                </div>}
                {results.cssResults && results.saludResults && (
                  <div className="mt-4">
                    <ResultRow label={t.results.totalCssPayment.label} subLabel={t.results.totalCssPayment.subLabel} value={formatCurrency(results.cssResults.cssPayment + results.saludResults.saludPayment)} formula={t.results.totalCssPayment.formula} formulaNumbers={`${formatCurrency(results.cssResults.cssPayment)} + ${formatCurrency(results.saludResults.saludPayment)}`} isHighlighted={true} highlightColor={"blue1"} />
                  </div>
                )}
              </div>
            )}

            {results.isrResults && (
              <div>
                <SectionTitle title={t.results.sectionTitleISR} />
                <ResultRow label={t.results.annualTaxableIncome.label} value={formatCurrency(results.isrResults.annualTaxableIncome)} formula={t.results.annualTaxableIncome.formula} formulaNumbers={`(${formatCurrency(results.income, 0)} + ${formatCurrency(results.requiredProfit)}) * 12`} />
                <ResultRow label={t.results.taxBracket.label} value={results.isrResults.taxBracket} formula={t.results.taxBracket.formula} />
                {results.isrResults.taxableSurplus > 0 && <ResultRow label={t.results.taxableSurplus.label} value={formatCurrency(results.isrResults.taxableSurplus)} formula={results.isrResults.taxableSurplusFormula} />}
                <ResultRow label={t.results.estimatedISR.label} subLabel={t.results.estimatedISR.subLabel} value={formatCurrency(results.isrResults.estimatedISR)} formula={results.isrResults.isrFormula} />
                <ResultRow label={t.results.annualIncomeAfterISR.label} subLabel={t.results.annualIncomeAfterISR.subLabel} value={formatCurrency(results.isrResults.annualIncomeAfterISR)} formula={t.results.annualIncomeAfterISR.formula} formulaNumbers={`${formatCurrency(results.isrResults.annualTaxableIncome)} - ${formatCurrency(results.isrResults.estimatedISR)} - (${formatCurrency((results.cssResults ? results.cssResults.cssPayment : 0) + (results.saludResults ? results.saludResults.saludPayment : 0))} * 12)`} isHighlighted={true} highlightColor={"green1"} />
              </div>
            )}

            <div>
              <SectionTitle title={t.results.sectionTitleSuggested} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <SuggestedPriceCard
                  title={t.results.roundedPriceNoTax.label}
                  price={results.roundedPriceNoTax}
                  bgColor={"green1"}
                  textColor={"darkGreen"}
                />
                <SuggestedPriceCard
                  title={t.results.roundedPriceWithTax.label}
                  price={results.roundedPriceWithTax}
                  basePrice={results.basePriceForRoundedWithTax}
                  basePriceLabel={t.results.roundedPriceWithTax.basePriceLabel}
                  bgColor={"primary"}
                  textColor={"lightText"}
                />
              </div>
            </div>
            <FinalAnalysis results={results} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <p className="text-center text-lg text-darkText">{t.guidance}</p>
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
      <h4 className="text-lg font-semibold text-primary">{title}</h4>
      <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </span>
    </button>
    {isOpen && (
      <div className="p-4 border-t bg-lightGray1">
        {children}
      </div>
    )}
  </div>
);


// Main App Component
function CalculadoraDeServicios() {
  const { language } = useLanguage();
  const [openSection, setOpenSection] = useState(null);
  const t = translations[language].consultoria;
  const tCommon = translations[language].common;

  // State for collapsible footer sections
  const [showConcepts, setShowConcepts] = useState(false);
  const [showFormulas, setShowFormulas] = useState(false);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <>
      <div className="min-h-screen p-4 bg-lightGray2">
        {/* Header */}
        <header className="text-center mb-8 pt-8 mx-auto relative">
          <div className="justify-between items-center">
            <div className="mt-2 md:mt-0">
              <h1 className="text-3xl md:text-4xl font-extrabold text-primary">{t.mainTitle}</h1>
              <p className="text-md text-darkText">{t.subtitle}</p>
            </div>
          </div>
        </header>

        {/* Calculator Content */}
        <main>
          <ServiceCalculator t={t} />
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 p-4 border-t border-accent2">
          <div className="max-w-4xl mx-auto">
            {/* Toggle Buttons for Concepts and Formulas */}
            <div className="flex justify-center gap-4 mb-6">
              <button onClick={() => { setShowConcepts(!showConcepts); setShowFormulas(false); }} className="py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 flex-1 cursor-pointer bg-darkBlue shadow-md shadow-darkBlue">
                {showConcepts ? t.footer.hideConcepts : t.footer.showConcepts}
              </button>
              <button onClick={() => { setShowFormulas(!showFormulas); setShowConcepts(false); }} className="py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 flex-1 cursor-pointer bg-green2 shadow-md shadow-darkGreen">
                {showFormulas ? t.footer.hideFormulas : t.footer.showFormulas}
              </button>
            </div>

            {/* Concepts Section (Collapsible) */}
            {showConcepts && (
              <div className="mt-4 p-4 border rounded-lg border-accent2 bg-white">
                <h4 className="text-lg font-bold mb-3 text-primary">{t.footer.conceptsTitle}</h4>
                <div className="space-y-3 text-sm text-left">
                  {Object.entries(t.footer.allConcepts).map(([key, value]) => (
                    <div key={key}><p><strong className="text-secondary">{value.split(':')[0]}:</strong> {value.split(':').slice(1).join(':')}</p></div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulas Section (Collapsible) */}
            {showFormulas && (
              <div className="mt-4 p-4 border rounded-lg border-accent2 bg-white">
                <h4 className="text-lg font-bold mb-3 text-primary">{t.footer.formulasTitle}</h4>
                <div className="space-y-3 text-sm text-left bg-gray-100">
                  {Object.entries(t.footer.allFormulas).map(([key, value]) => (
                    <p key={key} className="font-mono p-2 rounded-md"><strong className="text-darkBlue">{value.split('=')[0]} =</strong> {value.split('=')[1]}</p>
                  ))}
                </div>
              </div>
            )}
            <p className="text-sm text-darkBlue mt-8" dangerouslySetInnerHTML={{ __html: tCommon.disclaimer }}></p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CalculadoraDeServicios;
