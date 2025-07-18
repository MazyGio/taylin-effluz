import React, { useState, useEffect } from 'react';
import brandColors from '../styles/brandColors';
import { translations } from '../assets/localization/translations';
import { InputField } from './InputField';
import { useLanguage } from '../contexts/LanguageContext';
import { formatCurrency } from '../utils/formatter';

// Reusable Result Display Component
const ResultDisplay = ({ label, value, isHighlighted = false, isSubtle = false, isNegative = false }) => (
    <div className={`flex justify-between items-center mb-2 ${isHighlighted ? 'text-base font-bold' : 'text-sm'} ${isSubtle ? 'text-gray-600' : ''}`}
        style={{
            color: isNegative ? brandColors.primary : (isHighlighted ? brandColors.primary : brandColors.darkBlue),
        }}>
        <span className="font-semibold">{label}:</span>
        <span className="text-right">{value}</span>
    </div>
);


// The Main Calculator Component
const CommissionCalculator = () => {
    const { language } = useLanguage();
    const t = translations[language].utilidad;
    const [productCost, setProductCost] = useState('');
    const [sellingPrice, setSellingPrice] = useState('');
    const [expectedMargin, setExpectedMargin] = useState('');
    const [paymentCommissionPercentage, setPaymentCommissionPercentage] = useState('');
    const [paymentCommissionFixed, setPaymentCommissionFixed] = useState('');
    const [websiteCommissionPercentage, setWebsiteCommissionPercentage] = useState('');
    const [sellerCommissionPercentage, setSellerCommissionPercentage] = useState('');
    const [otherCommissions, setOtherCommissions] = useState('');
    const [taxRate, setTaxRate] = useState('');
    const [isTaxIncluded, setIsTaxIncluded] = useState(null);
    const [results, setResults] = useState(null);
    const [autoCalculateMargin, setAutoCalculateMargin] = useState(false);

    useEffect(() => {
        const pc = parseFloat(productCost || 0);
        const sp_input = parseFloat(sellingPrice || 0);
        const tr = parseFloat(taxRate || 0);

        if (pc <= 0 || sp_input <= 0 || isTaxIncluded === null) {
            setExpectedMargin('');
            return;
        }

        let sp_pre_tax;
        if (isTaxIncluded) {
            sp_pre_tax = sp_input / (1 + tr / 100);
        } else {
            sp_pre_tax = sp_input;
        }

        if (sp_pre_tax <= pc) {
            setExpectedMargin('0.00');
            return;
        }

        const margin = ((sp_pre_tax - pc) / sp_pre_tax) * 100;
        setExpectedMargin(margin.toFixed(2));
    }, [productCost, sellingPrice, taxRate, isTaxIncluded]);


    const handleCalculate = () => {
        const pc = parseFloat(productCost || 0);
        const sp_input = parseFloat(sellingPrice || 0);
        const em = parseFloat(expectedMargin || 0);
        const pcp = parseFloat(paymentCommissionPercentage || 0);
        const pcf = parseFloat(paymentCommissionFixed || 0);
        const wcp = parseFloat(websiteCommissionPercentage || 0);
        const scp = parseFloat(sellerCommissionPercentage || 0);
        const oc = parseFloat(otherCommissions || 0);
        const tr = parseFloat(taxRate || 0);

        if (isNaN(pc) || isNaN(sp_input) || isNaN(em) || isNaN(pcp) || isNaN(pcf) || isNaN(wcp) || isNaN(scp) || isNaN(oc) || isNaN(tr) || sp_input <= 0 || isTaxIncluded === null) {
            setResults(null);
            return;
        }

        let sp_pre_tax;
        let taxAmount;
        let sp_with_tax;

        if (isTaxIncluded) {
            sp_with_tax = sp_input;
            sp_pre_tax = sp_with_tax / (1 + tr / 100);
            taxAmount = sp_with_tax - sp_pre_tax;
        } else {
            sp_pre_tax = sp_input;
            taxAmount = sp_pre_tax * (tr / 100);
            sp_with_tax = sp_pre_tax + taxAmount;
        }

        const expectedProfit = sp_pre_tax - pc;

        const commissionPaymentPercentAmount = sp_with_tax * (pcp / 100);
        const commissionWebsitePercentAmount = sp_with_tax * (wcp / 100);
        const sellerCommissionAmount = sp_pre_tax * (scp / 100); // Seller commission on pre-tax price
        const totalCommissions = commissionPaymentPercentAmount + pcf + commissionWebsitePercentAmount + sellerCommissionAmount + oc;

        const finalProfit = sp_pre_tax - pc - totalCommissions;
        const finalProfitMargin = (sp_pre_tax === 0) ? 0 : (finalProfit / sp_pre_tax) * 100;

        const profitDifference = expectedProfit - finalProfit;
        const marginDifference = em - finalProfitMargin;

        setResults({
            sellingPricePreTax: sp_pre_tax,
            taxAmount: taxAmount,
            sellingPriceWithTax: sp_with_tax,
            expectedProfit: expectedProfit,
            expectedMargin: em,
            commissionPaymentAmount: commissionPaymentPercentAmount,
            paymentCommissionFixedAmount: pcf,
            websiteCommissionAmount: commissionWebsitePercentAmount,
            sellerCommissionAmount: sellerCommissionAmount,
            otherCommissionsAmount: oc,
            totalCommissions: totalCommissions,
            finalProfit: finalProfit,
            finalProfitMargin: finalProfitMargin,
            profitDifference: profitDifference,
            marginDifference: marginDifference
        });
    };

    return (
        <div className="flex flex-col md:flex-row p-6 rounded-lg shadow-lg" style={{ backgroundColor: brandColors.white }}>
            {/* Input Section */}
            <div className="md:w-1/2 p-4">
                <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{t.calculator.title}</h3>
                <InputField label={t.calculator.inputs.productCost} value={productCost} onChange={setProductCost} hasPrefix={true} prefix="$" tooltipText={t.calculator.tooltips.productCost} />
                <InputField label={t.calculator.inputs.sellingPrice} value={sellingPrice} onChange={setSellingPrice} hasPrefix={true} prefix="$" tooltipText={t.calculator.tooltips.sellingPrice} />

                <hr className="my-6" style={{ borderColor: brandColors.accent1 }} />
                <InputField label={t.calculator.inputs.paymentCommissionPercentage} value={paymentCommissionPercentage} onChange={setPaymentCommissionPercentage} hasSuffix={true} suffix="%" tooltipText={t.calculator.tooltips.paymentCommissionPercentage} />
                <InputField label={t.calculator.inputs.paymentCommissionFixed} value={paymentCommissionFixed} onChange={setPaymentCommissionFixed} hasPrefix={true} prefix="$" tooltipText={t.calculator.tooltips.paymentCommissionFixed} />
                <InputField label={t.calculator.inputs.websiteCommissionPercentage} value={websiteCommissionPercentage} onChange={setWebsiteCommissionPercentage} hasSuffix={true} suffix="%" tooltipText={t.calculator.tooltips.websiteCommissionPercentage} />
                <InputField label={t.calculator.inputs.sellerCommissionPercentage} value={sellerCommissionPercentage} onChange={setSellerCommissionPercentage} hasSuffix={true} suffix="%" tooltipText={t.calculator.tooltips.sellerCommissionPercentage} />
                <InputField label={t.calculator.inputs.otherCommissions} value={otherCommissions} onChange={setOtherCommissions} hasPrefix={true} prefix="$" tooltipText={t.calculator.tooltips.otherCommissions} />
                <InputField label={t.calculator.inputs.taxRate} value={taxRate} onChange={setTaxRate} hasSuffix={true} suffix="%" tooltipText={t.calculator.tooltips.taxRate} />

                {/* Tax Inclusion Choice */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" style={{ color: brandColors.darkBlue }}>
                        {t.calculator.inputs.taxIncludedQuestion}
                    </label>
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input type="radio" name="tax_included_commission" value="yes" checked={isTaxIncluded === true} onChange={() => setIsTaxIncluded(true)} className="form-radio h-4 w-4" style={{ color: brandColors.secondary }} />
                            <span className="ml-2 pl-1 text-sm font-semibold" style={{ color: brandColors.darkBlue }}>{t.calculator.inputs.taxIncludedYes}</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="tax_included_commission" value="no" checked={isTaxIncluded === false} onChange={() => setIsTaxIncluded(false)} className="form-radio h-4 w-4" style={{ color: brandColors.secondary }} />
                            <span className="ml-2 pl-1 text-sm font-semibold" style={{ color: brandColors.darkBlue }}>{t.calculator.inputs.taxIncludedNo}</span>
                        </label>
                    </div>
                    {isTaxIncluded === null && (
                        <p className="text-red-500 text-xs italic mt-1">{t.calculator.mandatoryChoiceGuidance}</p>
                    )}
                </div>

                <button onClick={handleCalculate} className="w-full py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105" style={{ backgroundColor: brandColors.primary, boxShadow: `0 4px ${brandColors.darkBlue}` }}>
                    {t.languageToggle === 'English' ? 'Calcular' : 'Calculate'}
                </button>
                <p className="text-sm text-gray-500 mt-2">{t.calculator.inputGuidance}</p>
            </div>

            {/* Results Section */}
            <div className="md:w-1/2 p-4 md:border-l border-gray-200" style={{ borderColor: brandColors.accent2 }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: brandColors.primary }}>{t.calculator.outputs.resultsTitle}</h3>
                {results ? (
                    <div className="space-y-4">
                        {/* Initial Price Breakdown */}
                        <div className="p-3 border rounded-lg shadow-sm" style={{ borderColor: brandColors.accent2 }}>
                            <ResultDisplay label={t.calculator.outputs.sellingPricePreTax} value={formatCurrency(results.sellingPricePreTax)} />
                            <ResultDisplay label={t.calculator.outputs.taxAmount} value={formatCurrency(results.taxAmount)} />
                            <ResultDisplay label={t.calculator.outputs.sellingPriceWithTax} value={formatCurrency(results.sellingPriceWithTax)} />
                        </div>

                        <div className="p-3 border rounded-lg shadow-sm" style={{ borderColor: brandColors.accent2 }}>
                            <h4 className="font-semibold text-center mb-2" style={{ color: brandColors.darkBlue }}>{t.calculator.outputs.scenarioWithoutCommissions}</h4>
                            <hr className="mb-2" style={{ borderColor: brandColors.accent2 }} />
                            <ResultDisplay label={t.calculator.outputs.expectedProfit} value={formatCurrency(results.expectedProfit)} />
                            <ResultDisplay label={t.calculator.outputs.expectedMargin} value={formatCurrency(results.expectedMargin, symbol = '%', isPrefix = false)} />
                        </div>

                        <div className="p-3 border rounded-lg shadow-sm" style={{ borderColor: brandColors.accent2 }}>
                            <h4 className="font-semibold text-center mb-2" style={{ color: brandColors.darkBlue }}>{t.calculator.outputs.commissionBreakdownTitle}</h4>
                            <hr className="mb-2" style={{ borderColor: brandColors.accent2 }} />
                            <ResultDisplay label={t.calculator.outputs.paymentCommissionAmount} value={formatCurrency(results.commissionPaymentAmount)} isSubtle={true} />
                            <ResultDisplay label={t.calculator.outputs.paymentCommissionFixedAmount} value={formatCurrency(results.paymentCommissionFixedAmount)} isSubtle={true} />
                            <ResultDisplay label={t.calculator.outputs.websiteCommissionAmount} value={formatCurrency(results.websiteCommissionAmount)} isSubtle={true} />
                            <ResultDisplay label={t.calculator.outputs.sellerCommissionAmount} value={formatCurrency(results.sellerCommissionAmount)} isSubtle={true} />
                            <ResultDisplay label={t.calculator.outputs.otherCommissionsAmount} value={formatCurrency(results.otherCommissionsAmount)} isSubtle={true} />
                            <hr className="my-2 border-t-2" style={{ borderColor: brandColors.accent1 }} />
                            <ResultDisplay label={t.calculator.outputs.totalCommissions} value={formatCurrency(results.totalCommissions)} isHighlighted={true} />
                        </div>

                        <div className="p-3 border rounded-lg shadow-sm" style={{ borderColor: brandColors.accent2 }}>
                            <h4 className="font-semibold text-center mb-2" style={{ color: brandColors.darkBlue }}>{t.calculator.outputs.scenarioWithCommissions}</h4>
                            <hr className="mb-2" style={{ borderColor: brandColors.accent2 }} />
                            <ResultDisplay label={t.calculator.outputs.profit} value={formatCurrency(results.finalProfit)} isHighlighted={true} isNegative={results.finalProfit < 0} />
                            <ResultDisplay label={t.calculator.outputs.profitMargin} value={formatCurrency(results.finalProfitMargin, symbol = '%', isPrefix = false)} isHighlighted={true} isNegative={results.finalProfitMargin < 0} />
                        </div>

                        <div className="p-3 rounded-lg shadow-sm" style={{ backgroundColor: brandColors.lightGray1, border: `1px solid ${brandColors.accent2}` }}>
                            <h4 className="font-bold text-center mb-2" style={{ color: brandColors.primary }}>{t.calculator.outputs.variationAnalysis}</h4>
                            <p className="text-center text-sm" style={{ color: brandColors.darkBlue }}
                                dangerouslySetInnerHTML={{
                                    __html: t.calculator.outputs.variationAnalysisText
                                        .replace('{profitDifference}', formatCurrency(results.profitDifference))
                                        .replace('{marginDifference}', formatCurrency(results.marginDifference, symbol = '%', isPrefix = false))
                                }}
                            />
                        </div>

                    </div>
                ) : (
                    <p className="text-gray-500">{t.calculator.resultsPlaceholder}</p>
                )}
            </div>
        </div>
    );
};


// Main App Component
function CalculadoraDeUtilidad() {
    const { language } = useLanguage();
    const t = translations[language].utilidad;
    
    // State for collapsible footer sections
    const [showConcepts, setShowConcepts] = useState(false);
    const [showFormulas, setShowFormulas] = useState(false);

    return (
        <div className="min-h-screen p-4" style={{ fontFamily: 'Albert Sans', backgroundColor: brandColors.lightGray2 }}>
            {/* Header */}
            <header className="text-center mb-8 pt-8 relative">
                <div className="justify-between items-center">
                    <div className="mt-2 md:mt-0">
                        <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: brandColors.primary }}>{t.mainTitle}</h1>
                        <p className="text-md md:text-lg mb-2" style={{ color: brandColors.darkBlue }}>{t.subtitle1}</p>
                        <p className="text-md md:text-lg font-semibold max-w-xl mx-auto" style={{ color: brandColors.secondary }}>{t.subtitle2_line1}</p>
                        <p className="text-sm md:text-md font-semibold max-w-xl mx-auto" style={{ color: brandColors.secondary }}>{t.subtitle2_line2}</p>
                    </div>
                </div>
            </header>

            {/* Calculator Content */}
            <main className="max-w-4xl mx-auto">
                <CommissionCalculator t={t} />
            </main>

            {/* Footer */}
            <footer className="text-center mt-12 p-4 border-t" style={{ borderColor: brandColors.accent2 }}>
                <div className="max-w-4xl mx-auto">
                    {/* Toggle Buttons for Concepts and Formulas */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button onClick={() => { setShowConcepts(!showConcepts); setShowFormulas(false); }} className="py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 flex-1" style={{ backgroundColor: brandColors.darkBlue, boxShadow: `0 4px ${brandColors.primary}` }}>
                            {showConcepts ? t.footer.hideConcepts : t.footer.showConcepts}
                        </button>
                        <button onClick={() => { setShowFormulas(!showFormulas); setShowConcepts(false); }} className="py-2 px-4 rounded-md text-white font-bold transition duration-300 ease-in-out transform hover:scale-105 flex-1" style={{ backgroundColor: brandColors.green2, boxShadow: `0 4px ${brandColors.darkGreen}` }}>
                            {showFormulas ? t.footer.hideFormulas : t.footer.showFormulas}
                        </button>
                    </div>

                    {/* Concepts Section (Collapsible) */}
                    {showConcepts && (
                        <div className="mt-4 p-4 border rounded-lg" style={{ borderColor: brandColors.accent2, backgroundColor: brandColors.white }}>
                            <h4 className="text-lg font-bold mb-3" style={{ color: brandColors.primary }}>{t.footer.conceptsTitle}</h4>
                            <div className="space-y-3 text-sm text-left">
                                {Object.entries(t.footer.allConcepts).map(([key, value]) => (
                                    <div key={key}><p><strong style={{ color: brandColors.secondary }}>{value.split(':')[0]}:</strong> {value.split(':').slice(1).join(':')}</p></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Formulas Section (Collapsible) */}
                    {showFormulas && (
                        <div className="mt-4 p-4 border rounded-lg" style={{ borderColor: brandColors.accent2, backgroundColor: brandColors.white }}>
                            <h4 className="text-lg font-bold mb-3" style={{ color: brandColors.primary }}>{t.footer.formulasTitle}</h4>
                            <div className="space-y-3 text-sm text-left bg-gray-100">
                                {Object.entries(t.footer.allFormulas).map(([key, value]) => (
                                   <p key={key} className="font-mono p-2 rounded-md"><strong style={{ color: brandColors.darkBlue }}>{value.split('=')[0]} =</strong> {value.split('=')[1]}</p>
                                ))}
                            </div>
                        </div>
                    )}
                    <p className="text-sm text-gray-500 mt-8" style={{ color: brandColors.darkBlue }} dangerouslySetInnerHTML={{ __html: t.footer.disclaimer }}></p>
                </div>
            </footer>
        </div >
    );
};

export default CalculadoraDeUtilidad;