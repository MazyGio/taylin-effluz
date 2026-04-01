import {useLoaderData} from 'react-router';
import CalculadorasLandingPage from '~/components/CalculadorasLandingPage';
import CalculadorasDemoPage from '~/components/CalculadorasDemoPage';
import { LandingPageLanguageSelector } from '~/components/LandingPageLanguageSelector';
import { useLanguage } from '~/contexts/LanguageContext';
import { CUSTOMER_DETAILS_QUERY } from '~/graphql/customer-account/CustomerDetailsQuery';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = () => {
  return [{title: `Taylin Luzcando - Calculadoras`}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({ context }) {
  const {customerAccount} = context;
  const isLoggedIn = await customerAccount.isLoggedIn();
  let customerDetails = null;

  if (isLoggedIn) {
    customerDetails = await context.customerAccount.query(
      CUSTOMER_DETAILS_QUERY,
    );
  }

  return {
    isLoggedIn,
    customerDetails: customerDetails || null,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData() {
  return {};
}

export default function SelectorCalculadoras() {
  /** @type {LoaderReturnData} */
  const { isLoggedIn, customerDetails } = useLoaderData();
  const { language, setLanguage } = useLanguage();

  return (
    <div>
      <div className="fixed top-0 right-0 p-8 z-10">
          <LandingPageLanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      <CalculadorasLandingPage isLoggedIn={isLoggedIn} customerDetails={customerDetails} />
      <CalculadorasDemoPage />
    </div>
  );
}

