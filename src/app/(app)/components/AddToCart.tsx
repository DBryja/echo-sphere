"use client";
import { useShoppingCart } from "use-shopping-cart";
import type { Product } from "use-shopping-cart/core";
import { useEffect, useState } from "react";

export default function AddToCart({ product, disabled }: { product: Product }) {
  const { addItem, clearCart, cartDetails } = useShoppingCart();

  return (
    <div
      style={{
        width: "200px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <button disabled={disabled} onClick={() => addItem(product)}>
        Add to cart
      </button>
      <button onClick={() => console.log(cartDetails)}>View Cart</button>
      <button onClick={() => clearCart()}>Clear Cart</button>
    </div>
  );
}
