"use client";
import {useShoppingCart} from "use-shopping-cart";
import type {Product} from "use-shopping-cart/core"


export default function AddToCart({product}:{product: Product}) {
    const {addItem} = useShoppingCart();

    return (
        <button onClick={() => addItem(product)}>Add to cart</button>
    )
}
