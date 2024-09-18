"use client";
import {CSSProperties, useEffect, useRef} from "react";
import {useShoppingCart} from "use-shopping-cart";
import CartButton from "@/app/(app)/components/CartButton";
import Image from "next/image";

const styles = {
    cart: {
        position: 'fixed',
        right: "0",
        top: 0,
        width: "450px",
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: 20,
        boxSizing: 'border-box',
        transition: 'transform 0.3s',
        transform: 'translateX(100%)',
        color: "black",
        zIndex: 1000
    } as CSSProperties,
}

export default function SideCart(){
    const cartRef = useRef<HTMLDivElement | null>(null);
    const {cartDetails, formattedTotalPrice, incrementItem, decrementItem, shouldDisplayCart, handleCloseCart} = useShoppingCart();
    styles.cart.transform = shouldDisplayCart ? 'translateX(0)' : 'translateX(100%)';

    useEffect(() => {
        function handleClickOutisde(event:MouseEvent){
            console.log(shouldDisplayCart);
            if(cartRef.current && !cartRef.current.contains(event.target as Node) && shouldDisplayCart){
                handleCloseCart();
            }
        }

        window.addEventListener("click", handleClickOutisde);
        return ()=>{
            window.removeEventListener("click", handleClickOutisde);
        }
    }, [cartRef, shouldDisplayCart]);

    return <div style={{...styles.cart}} id={"cart"} ref={cartRef}>
        <h1>Cart</h1>
        <ul>
            {
                Object.values(cartDetails).map((item, i) => (
                    <li key={i} style={{display:"flex"}}>
                        <Image src={item.product_data.image.url} alt={item.product_data.image.alt} width={150} height={150} objectFit={"cover"}/>
                        <div>
                            <h3>{item.name}</h3>
                            <p>{item.sku}</p>
                            <section
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-evenly'
                                }}
                            >
                                <button
                                    onClick={() => decrementItem(item.id)}
                                    aria-label={`Remove one ${item.name} to your cart`}
                                    style={{height: 32, width: 32, marginBottom: 8}}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => incrementItem(item.id)}
                                    aria-label={`Add one ${item.name} to your cart`}
                                    style={{height: 32, width: 32, marginBottom: 8}}
                                >
                                    +
                                </button>
                            </section>
                            <p>{item.formattedValue}</p>
                        </div>
                    </li>
                ))
            }
        </ul>
        <p>Total: {formattedTotalPrice}</p>
        <CartButton/>
    </div>
}