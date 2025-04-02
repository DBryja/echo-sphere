"use client";
import {CartProvider} from "use-shopping-cart";

export default function Cart({ children }: { children: React.ReactNode }) {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!stripeKey) {
    throw new Error("Stripe key is not defined");
  }
  return (
      <CartProvider
        // @ts-ignore
        mode="payment"
        cartMode="checkout-session"
        stripe={stripeKey}
        currency="USD"
        language="en"
        shouldPersist={true}
        successUrl={`${process.env.NEXT_PUBLIC_URL}/success`}
        cancelUrl={`${process.env.NEXT_PUBLIC_URL}/cart`}
      >
          {children}
      </CartProvider>
    );
}
