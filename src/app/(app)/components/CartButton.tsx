"use client";
import { useState } from "react";
import { useShoppingCart, DebugCart } from "use-shopping-cart";


//TODO: Add items validation
export default function CartButton() {
    const [status, setStatus] = useState('idle');
    const { cartDetails, cartCount, redirectToCheckout } = useShoppingCart();

    async function handleClick(event) {
        event.preventDefault();
        if (cartCount > 0) {
            setStatus('loading');
            try {
                // Create a Checkout Session on the server
                const response = await fetch('/api/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cartDetails }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const {sessionId} = await response.json();
                // Redirect to Checkout
                const result = await redirectToCheckout(sessionId);

                if (result?.error) {
                    console.error(result);
                    setStatus('redirect-error');
                }
            } catch (error) {
                console.error(error);
                setStatus('redirect-error');
            }
        } else {
            setStatus('missing-items');
        }
    }

    return (
        <>
            <button onClick={handleClick} disabled={status === 'loading'}>
                {status === 'loading' ? 'Loading...' : 'Checkout'}
            </button>
        </>
    );
}