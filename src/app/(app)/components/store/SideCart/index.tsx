"use client";
import { useEffect, useRef, useCallback, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import type {CartEntry} from "use-shopping-cart/core";
import CartButton from "@components/store/CartButton";
import Image from "@components/Image";
import "./SideCart.scss"
import colors from "@globals/_colors.module.scss";
import { formatCurrencyString, getImageUrl, getImgAlt } from "@app/utils";
import { Media } from "@/payload-types";

export default function SideCart() {
  const cartRef = useRef<HTMLDivElement | null>(null);
  const [checkedDisclaimer, setCheckedDisclaimer] = useState(false);
  const {
    cartDetails,
    formattedTotalPrice,
    incrementItem,
    decrementItem,
    shouldDisplayCart,
    handleCloseCart,
    removeItem,
  } = useShoppingCart();
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (cartRef.current && shouldDisplayCart && e.target !== null) {
      if (cartRef.current?.contains(e.target as HTMLElement)) return;
      handleCloseCart();
    }
  }, [handleCloseCart]);
  const handleDisclaimerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedDisclaimer(e.target.checked);
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [cartRef, shouldDisplayCart, handleCloseCart]);

  return (
    <div className={`cart ${shouldDisplayCart?"cart--open":""}`} id={"cart"} ref={cartRef}>
      <div className={"cart__container"}>
        <div className={"cart__head"}>
          <h3 className={"cart__head__title"}>SHOPPING CART</h3>
          <button className={"cart__head__close"} onClick={handleCloseCart}><StoreCross color={'red'}/></button>
        </div>
        <ul className={"cart__list"}>
          {cartDetails && Object.values(cartDetails).map((item, i) => (
            <CartItem
              key={i}
              item={item}
              decrementItem={decrementItem}
              incrementItem={incrementItem}
              removeItem={removeItem}
            />
          ))}
        </ul>
        <div className={"cart__total"}>
          <p className={"cart__total__label"}>SUBTOTAL</p>
          <p className={"cart__total__shipping"}>Free shipping on orders of $100 or more.</p>
          <p className={"cart__total__price"}>{formattedTotalPrice}</p>
        </div>
        <div className={"cart__checkout"}>
          <div className={"cart__checkout__disclaimer"}>
            <p id={"disclaimer-description"}>
              <span>Disclaimer:&nbsp;</span>
              This shop is not a real business. No actual billing or transactions will take place. Please avoid entering real personal or payment information.
            </p>
            <input
              type="checkbox"
              id="disclaimer"
              name="disclaimer"
              checked={checkedDisclaimer}
              onChange={handleDisclaimerChange}
              aria-label="Agreement to disclaimer terms"
              aria-describedby="disclaimer-description"
            />
          </div>
        </div>
        <div className={"cart__checkout__buttons"}>
          <CartButton className={"cart__checkout__goTo"} disabled={!checkedDisclaimer}/>
          <button className={"cart__checkout__continue"} onClick={handleCloseCart}>
            RETURN TO SHOPPING
          </button>
        </div>
      </div>
    </div>
  );
}

const StoreCross = ({color="white", size=32}: {color?:"white"|"red" , size?:number}) => {
  const fill = colors[color] || "#fff";
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 32 32" fill="none">
    <path fill={fill} d="M7.46592 4.2669C7.19299 4.2669 6.91976 4.37087 6.71176 4.5794L4.57843 6.71273C4.16136 7.1298 4.16136 7.80507 4.57843 8.22107L12.3576 16.0002L4.57843 23.7794C4.16136 24.1965 4.16136 24.8717 4.57843 25.2877L6.71176 27.4211C7.12882 27.8381 7.80409 27.8381 8.22009 27.4211L15.9993 19.6419L23.7784 27.4211C24.1944 27.8381 24.8708 27.8381 25.2868 27.4211L27.4201 25.2877C27.8372 24.8707 27.8372 24.1954 27.4201 23.7794L19.6409 16.0002L27.4201 8.22107C27.8372 7.80507 27.8372 7.12873 27.4201 6.71273L25.2868 4.5794C24.8697 4.16233 24.1944 4.16233 23.7784 4.5794L15.9993 12.3586L8.22009 4.5794C8.01156 4.37087 7.73886 4.2669 7.46592 4.2669Z"/>
  </svg>
}

interface ICartItem {
  item: CartEntry;
  decrementItem: (id: string) => void;
  incrementItem: (id: string) => void;
  removeItem: (id: string) => void;
}
const CartItem = ({item, decrementItem, incrementItem, removeItem}: ICartItem) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleIncrement = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    if (item.stock - (item.quantity + 1) >= 0) {
      incrementItem(item.id);
    }
    setTimeout(() => {
      setIsUpdating(false);
    }, 50);
  };
  const handleDecrement = () => {
    if (isUpdating) return;
    setIsUpdating(true);
    decrementItem(item.id);
    setTimeout(() => {
      setIsUpdating(false);
    }, 50);
  };
  const handleRemove = () => {
    removeItem(item.id);
  }

  const pd = item.product_data && item.product_data as {
    image: Media | string;
    id: string | number;
  };
  return (
    <li className={"cart__item"}>
      <div className={"cart__item__image"}>
        {pd && <Image src={getImageUrl(pd.image)} alt={getImgAlt(pd.image)} fill />}
      </div>
      <div className={"cart__item__content"}>
        <p className={"cart__item__name"}>{item.name}</p>
        <p className={"cart__item__size"}>SIZE: {item.size === "os" ? "OneSize" : item.size}</p>
      </div>
      <div className={"cart__item__price"}>
        <p>{formatCurrencyString(item.value, "USD", false)}</p>
        <div className={"cart__item__buttons"}>
          <button
            onClick={handleDecrement}
            aria-label={`Remove one ${item.name} to your cart`}
            disabled={isUpdating}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={handleIncrement}
            aria-label={`Add one ${item.name} to your cart`}
            disabled={isUpdating}
          >
            +
          </button>
        </div>
      </div>
      <button className={"cart__item__delete"} onClick={handleRemove}>
        <StoreCross color="white" size={24} />
      </button>
    </li>
  )
}