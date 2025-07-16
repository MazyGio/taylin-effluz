import {useLoaderData} from 'react-router';
import {CartForm} from '@shopify/hydrogen';
import {data} from '@shopify/remix-oxygen';
import {CartMain} from '~/components/CartMain';

/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: `Hydrogen | Cart`}];
};

/**
 * @type {HeadersFunction}
 */
export const headers = ({actionHeaders}) => actionHeaders;

/**
 * @param {ActionFunctionArgs}
 */
export async function action({request, context}) {
  const {cart, customerAccount} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result;
  const acceleratedCheckout = formData.get('acceleratedCheckout');
  const storeDomain = context.env.PUBLIC_STORE_DOMAIN;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      if (acceleratedCheckout) {
        result = await cart.addLines(inputs.lines);
        const buyer = await customerAccount.getBuyer();
        await cart.updateBuyerIdentity({
          customerAccessToken: buyer.customerAccessToken,
        });
      } else {
        result = await cart.addLines(inputs.lines);
      }
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.GiftCardCodesUpdate: {
      const formGiftCardCode = inputs.giftCardCode;

      // User inputted gift card code
      const giftCardCodes = formGiftCardCode ? [formGiftCardCode] : [];

      // Combine gift card codes already applied on cart
      giftCardCodes.push(...inputs.giftCardCodes);

      result = await cart.updateGiftCardCodes(giftCardCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result?.cart?.id;
  const headers = cartId ? cart.setCartId(result.cart.id) : new Headers();
  const {cart: cartResult, errors, warnings} = result;

  // https://<shop-domain>/checkouts/<checkout_id>
  // https://effluz.com/checkouts/<checkout_id>?logged_in=true
  // https://effluz.com/cart/c/Z2NwLXVzLWVhc3QxOjAxSzA1UjYyTUgyUlRUUkJEV1EzNFQ5VDJW?key=SWHA42Kp0QJnWEzLuHVMMgQGYHYPkM6go6ABHrKSBJy0vyXGd-jWGJKsbHscCmoikVz51r4cvzgKmZqQG9QLOb47FH3OXa-zgwGoezAE_AK1vio4qOoHs80Go9g-HYIiVCQ33BtuGAp231K1j6h5GQ%3D%3D?logged_in=true&cartId=gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSzA1UjYyTUgyUlRUUkJEV1EzNFQ5VDJW?key=414f0b6eda35317c8b4fb3f81803636f
  // cartId: gid://shopify/Cart/Z2NwLXVzLWVhc3QxOjAxSzA1UjYyTUgyUlRUUkJEV1EzNFQ5VDJW?key=414f0b6eda35317c8b4fb3f81803636f
  // https://effluz.com/checkouts/cn/Z2NwLXVzLWVhc3QxOjAxSzA1UjYyTUgyUlRUUkJEV1EzNFQ5VDJW?key=414f0b6eda35317c8b4fb3f81803636f?logged_in=true didn't work, redirected to login
  // https://effluz.com/cart/c/Z2NwLXVzLWVhc3QxOjAxSzA1UjYyTUgyUlRUUkJEV1EzNFQ5VDJW?key=eG5DgfKD4lxoA3YwoN6ySdb1U9RmHtJSyAItSwVWTtDj2qGNJekKiR3_j1sfsPI_uITPCGkzjB_X-ovY_i3G2ZoajSfPKgCJJP157YgtG8r7BvWp-3fhR4CoC-M2Xn8isU95xoQKSdoUzFhto69Qbw%3D%3D

  let checkoutUrl = '';
  // if (acceleratedCheckout) {
  //   if (cartResult.checkoutUrl.includes("checkouts")) {
  //     checkoutUrl = cartResult.checkoutUrl;
  //   } else if (cartResult.checkoutUrl.includes("cart")) {
  //     const checkoutId = cartId.split("/").pop().split("?")[0];
  //     checkoutUrl = `https://${storeDomain}/checkouts/cn/${checkoutId}?logged_in=true`;
  //   }
  // }
  checkoutUrl = cartResult.checkoutUrl;
  const redirectTo = acceleratedCheckout ? checkoutUrl : (formData.get('redirectTo') ?? null);
  // const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return data(
    {
      cart: cartResult,
      errors,
      warnings,
      analytics: {
        cartId,
      },
      redirectTo,
      acceleratedCheckout,
    },
    {status, headers},
  );
}

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context}) {
  const {cart} = context;
  return await cart.get();
}

export default function Cart() {
  /** @type {LoaderReturnData} */
  const cart = useLoaderData();

  return (
    <div className="cart">
      <h1>Cart</h1>
      <CartMain layout="page" cart={cart} />
    </div>
  );
}

/** @template T @typedef {import('react-router').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/hydrogen').CartQueryDataReturn} CartQueryDataReturn */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').HeadersFunction} HeadersFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
