"use client";
import { useShoppingCart } from "use-shopping-cart";

export default function OpenCart(){
    const {handleCartClick, shouldDisplayCart} = useShoppingCart();

    return <button onClick={()=>{
        setTimeout(()=>{
            if(!shouldDisplayCart) handleCartClick();
        }, 100)
    }}>
        Open Cart
    </button>
}