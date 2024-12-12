"use client";
import { CartProvider } from "use-shopping-cart";

export default function Cart({ children }) {
  return (
    <CartProvider
      mode="payment"
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
      currency="USD"
      language="en"
      shouldPersist={true}
      successUrl={`${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`}
      cancelUrl={`${process.env.NEXT_PUBLIC_URL}/cart`}
    >
      {children}
    </CartProvider>
  );
}
