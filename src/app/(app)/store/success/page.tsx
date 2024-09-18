"use client";
import React, {useEffect} from 'react';
import {useShoppingCart} from "use-shopping-cart";

export default function SuccessPage() {
    const {clearCart} = useShoppingCart();
    useEffect(() => {
        clearCart();
    }, [clearCart]);


    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your transaction has been completed successfully.</p>
            <a href="/store">Continue Shopping</a>
        </div>
    );
}