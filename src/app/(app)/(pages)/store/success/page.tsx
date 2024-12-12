"use client";
import React, { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

//TODO: Retrieve the order id from the query params and
export default function SuccessPage(params) {
  console.log(params);

  const { clearCart } = useShoppingCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Payment Successful!</h1>
      <p>
        Thank you for your purchase. Your transaction has been completed
        successfully.
      </p>
      <a href="/store">Continue Shopping</a>
    </div>
  );
}
