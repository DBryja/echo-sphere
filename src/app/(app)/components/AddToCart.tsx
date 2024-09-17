"use client";
import {useShoppingCart} from "use-shopping-cart";
import type {Product} from "use-shopping-cart/core"


export default function AddToCart({product}:{product: Product}) {
    const {addItem, clearCart, cartDetails} = useShoppingCart();

    return (<>
        <button onClick={() => addItem(product)}>Add to cart</button>
        <button onClick={()=>console.log(cartDetails)}>View Cart</button>
        <button onClick={() => clearCart()}>Clear Cart</button>
    </>
    )
}
