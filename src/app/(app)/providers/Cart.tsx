"use client";
import { CartProvider } from "use-shopping-cart";

const path = process.env.NODE_ENV === "production"
        ? process.env.LIVE_URL
        : "http://localhost:3000";

export default function Cart({ children }) {
    return (
        <CartProvider
            mode="payment"
            cartMode="checkout-session"
            stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
            currency="USD"
            language="en"
            shouldPersist={true}
            successUrl={`${path}/success?session_id={CHECKOUT_SESSION_ID}`}
            cancelUrl={`${path}/cart`}
        >
            {children}
        </CartProvider>
    );
}