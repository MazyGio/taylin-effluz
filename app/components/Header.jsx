import { Suspense } from 'react';
import { Await, Link, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { useAside } from '~/components/Aside';
import { customMenu } from '~/custom-data/calculadoraMenu';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../assets/localization/translations';
import { CalculadorasHomeButton } from './CalculadorasHomeButton';
import { LuCircleUserRound } from 'react-icons/lu';
import { useLocation } from 'react-router';

/**
 * @param {HeaderProps}
 */
export function Header({ header, isLoggedInPromise: isLoggedInPromise, cart, publicStoreDomain }) {
  const { shop, menu } = header;
  const location = useLocation();

  return (
    location.pathname !== "/" && <header className="header">
      <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
        <CalculadorasHomeButton />
      </NavLink>
      <HeaderMenu
        menu={customMenu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedInPromise={isLoggedInPromise} cart={cart} />
    </header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();
  const { language } = useLanguage();
  const t = translations[language].menu;

  return (
    <nav className={className} role="navigation">
      {menu.items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            key={item.title}
            className="header-menu-item rounded-lg px-2 py-1"
            end
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {t.menuItems[item.title] || item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedInPromise' | 'cart'>}
 */
function HeaderCtas({ isLoggedInPromise: isLoggedInPromise }) {
  const { language, setLanguage } = useLanguage();
  
  return (
    <nav className="header-ctas" role="navigation">
      <Suspense fallback="Loading...">
        <Await resolve={isLoggedInPromise}>
          {(isLoggedIn) => (
            <Link to={isLoggedIn ? "/account" : "/login"}>
              <div className="flex flex-col items-center justify-center mt-1 text-primary">
                <span className="text-2xl">
                  <LuCircleUserRound />
                </span>
                <span className="text-xs">{isLoggedIn ? "Cuenta" : "Login"}</span>
              </div>
            </Link>
          )}
        </Await>
      </Suspense>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset cursor-pointer"
      onClick={() => open('mobile')}
    >
      <p className="text-xl font-extrabold">☰</p>
    </button>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      Cart {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedInPromise
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
