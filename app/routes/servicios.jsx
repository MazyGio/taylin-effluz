import '../styles/servicios.css';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Hydrogen | Servicios`}];
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
async function loadCriticalData({context, request, params}) {
  return {}
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  return {};
}

export default function Servicios() {
  return (
    <div>
        <div className="servicios">
            <iframe loading="lazy" className="canva-iframe"
                src="https://taylinluzcando.effluz.com/" allowfullscreen="allowfullscreen" allow="fullscreen">
            </iframe>
        </div>
        <a href="https://taylinluzcando.effluz.com/" target="_blank" rel="noopener">Website Servicios Taylin Luzcando</a> by Effluz
    </div>
  );
}
