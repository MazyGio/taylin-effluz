import CalculadoraDeServicios from '~/components/CalculadoraDeServicios';
import { CUSTOMER_DETAILS_QUERY } from '~/graphql/customer-account/CustomerDetailsQuery';
import { useLoaderData } from 'react-router';
import { RestrictedContentByTags } from '~/components/RestrictedContentByTags';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({ data }) => {
  return [{ title: `Calculadora de Servicios` }];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({ context, request, params }) {
  const { data, errors } = await context.customerAccount.query(
    CUSTOMER_DETAILS_QUERY,
  );

  return { data }
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({ context }) {
  return {};
}

export default function CalculadoraServicios() {
  const { data } = useLoaderData();
  return (
    <RestrictedContentByTags customer={data.customer} allowedTags={['cliente-calculadora']}>
      <CalculadoraDeServicios />
    </RestrictedContentByTags>
  )
}
