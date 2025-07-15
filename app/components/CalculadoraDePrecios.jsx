import { useState, useEffect } from 'react';
import brandColors from '../styles/brandColors';
import { LanguageSelector } from './LanguageSelector';
import { InputField } from './InputField';

// Translations object
import { translations } from '../assets/localization/translations';

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
  const [costType, setCostType] = useState('total_order'); // 'per_unit' or 'total_order'
  const [results, setResults] = useState(null);

  // Effect to handle quantity input based on costType
  useEffect(() => {
    if (costType === 'per_unit') {
      setQuantity('1'); // Force quantity to 1 if per unit
    }
  }, [costType]);


  const handleCalculate = () => {
    const dm = parseFloat(directMaterials || 0);
    const dl = parseFloat(directLabor || 0);
    const mo = parseFloat(manufacturingOverhead || 0);
    const oc = parseFloat(otherCosts || 0);
    const tr = parseFloat(transportation || 0);
    const qty = parseFloat(quantity || 1);

    if (isNaN(dm) || isNaN(dl) || isNaN(mo) || isNaN(oc) || isNaN(tr) || isNaN(qty) || dm < 0 || dl < 0 || mo < 0 || oc < 0 || tr < 0 || qty <= 0 || costType === null) {
      setResults(null);
      return;
    }

    let totalProductCost; // Per unit cost
    let overallTotalCost; // Total for the given quantity

    if (costType === 'per_unit') {
      totalProductCost = dm + dl + mo + oc + tr;
      overallTotalCost = totalProductCost * qty;
    } else { // costType === 'total_order'
      overallTotalCost = dm + dl + mo + oc + tr; // Sum of inputs is the overall total
      totalProductCost = overallTotalCost / qty; // Calculate per unit from total
    }

    setResults({
      directMaterials: dm,
      directLabor: dl,
      manufacturingOverhead: mo,
      otherCosts: oc,
      transportation: tr,
      totalProductCost: totalProductCost,
      overallTotalCost: overallTotalCost,
    });
  };

  return (
    <div className="flex flex-col md:flex-row p-6 rounded-lg shadow-lg" style={{ backgroundColor: brandColors.white }}>
      {/* Input Section */}
      <div className="md:w-1/2 p-4">
        <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{t.tab0.title}</h3> {/* Use single title */}
        <InputField label={t.tab0.inputs.directMaterials} value={directMaterials} onChange={setDirectMaterials} hasPrefix={true} prefix="$"/>
        <InputField label={t.tab0.inputs.directLabor} value={directLabor} onChange={setDirectLabor} hasPrefix={true} prefix="$"/>
        <InputField label={t.tab0.inputs.manufacturingOverhead} value={manufacturingOverhead} onChange={setManufacturingOverhead} hasPrefix={true} prefix="$"/>
        <InputField label={t.tab0.inputs.otherCosts} value={otherCosts} onChange={setOtherCosts} hasPrefix={true} prefix="$"/>
        <InputField label={t.tab0.inputs.transportation} value={transportation} onChange={setTransportation} hasPrefix={true} prefix="$"/>
        <InputField label={t.tab0.inputs.quantity} value={quantity} onChange={setQuantity} min="1" placeholder="1" /> {/* New quantity input */}

        {/* Cost Type Choice */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" style={{ color: brandColors.darkBlue }}>
            {t.tab0.inputs.costTypeQuestion}
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="cost_type"
                value="per_unit"
                checked={costType === 'per_unit'}
                onChange={() => setCostType('per_unit')}
                className="form-radio h-4 w-4"
                style={{ color: brandColors.blue2 }}
              />
              <span className="ml-2 text-sm font-semibold pl-1" style={{ color: brandColors.darkBlue }}>{t.tab0.inputs.costTypePerUnit}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="cost_type"
                value="total_order"
                checked={costType === 'total_order'}
                onChange={() => setCostType('total_order')}
                className="form-radio h-4 w-4"
                style={{ color: brandColors.blue2 }}
              />
              <span className="ml-2 text-sm font-semibold pl-1" style={{ color: brandColors.darkBlue }}>{t.tab0.inputs.costTypeTotalOrder}</span>
            </label>
          </div>
          {costType === null && (
            <p className="text-red-500 text-xs italic mt-1">{t.tab0.mandatoryChoiceGuidance}</p>
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
        <InputField label={t.tab1.inputs.cost} value={cost} onChange={setCost} hasPrefix={true} prefix="$"/>
        <InputField label={t.tab1.inputs.desiredMargin} value={desiredMargin} onChange={setDesiredMargin} hasSuffix={true} suffix="%"/>
        <InputField label={t.tab1.inputs.taxRate} value={taxRate} onChange={setTaxRate} hasSuffix={true} suffix="%" /> {/* New tax rate input */}
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
  const [isTaxIncluded, setIsTaxIncluded] = useState(true); // State for tax inclusion choice
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
        <InputField label={t.tab2.inputs.cost} value={cost} onChange={setCost} hasPrefix={true} prefix="$"/>
        <InputField label={t.tab2.inputs.desiredSellingPrice} value={desiredSellingPrice} onChange={setDesiredSellingPrice} hasPrefix={true} prefix="$"/>
        <InputField label={t.tab2.inputs.taxRate} value={taxRate} onChange={setTaxRate} hasSuffix={true} suffix="%" /> {/* New tax rate input */}

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
function CalculadoraDePrecios() {
  const [language, setLanguage] = useState('es'); // Default to Spanish
  const [activeTab, setActiveTab] = useState('tab0'); // Start with the new Product Cost tab
  const t = translations[language].precios; // Get current translations

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

      <header className="text-center mb-8 pt-8 relative">
        <div className="flex justify-between items-center">
          <div className="flex-1"></div>
          <div className="flex-4">
            <h1 className="text-4xl font-extrabold whitespace-nowrap" style={{ color: brandColors.primary }}>{t.mainTitle}</h1>
            <p className="text-lg mb-2" style={{ color: brandColors.darkBlue }}>{t.subtitle1}</p>
            <p className="text-lg font-semibold max-w-xl mx-auto" style={{ color: brandColors.secondary }}>{t.subtitle2}</p>
          </div>
          <div className="flex-1 flex justify-end">
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </div>
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
                className={`py-2 px-2 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 w-full h-full flex items-center justify-center text-center ${activeTab === tab.id ? 'bg-opacity-100' : 'bg-opacity-70'
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
