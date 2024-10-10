"use client";
import {useEffect, useRef} from "react";
import { useShoppingCart } from "use-shopping-cart";

export default function OpenCart({isStore}: {isStore: boolean}) {
    const {handleCartClick, shouldDisplayCart, cartDetails} = useShoppingCart();
    const qty = useRef<number>(0);
    qty.current = Object.values(cartDetails).reduce((total, item) => total + item.quantity, 0);

    const hidden = (!isStore && qty.current === 0);

    return <button
        className={"open-cart"}
        data-qty={qty.current>0?qty.current:""}
        style={{border: "none",
            background: "none",
            cursor: "pointer",
            opacity: hidden?0:1,
            visibility: hidden?"hidden":"visible",
            pointerEvents: hidden?"none":"auto"}
    }
        onClick={()=>{
        setTimeout(()=>{
            if(!shouldDisplayCart) handleCartClick();
        }, 100)
    }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.1776 24.79H26.9976C26.7886 24.1028 26.3643 23.501 25.7872 23.0734C25.2101 22.6458 24.5109 22.4149 23.7926 22.4149C23.0744 22.4149 22.3751 22.6458 21.7981 23.0734C21.221 23.501 20.7967 24.1028 20.5876 24.79H15.5176C15.3086 24.1028 14.8843 23.501 14.3072 23.0734C13.7301 22.6458 13.0309 22.4149 12.3126 22.4149C11.5944 22.4149 10.8951 22.6458 10.3181 23.0734C9.741 23.501 9.31665 24.1028 9.10762 24.79H8.40762C8.12004 24.7852 7.84029 24.6955 7.60348 24.5323C7.36667 24.369 7.18336 24.1395 7.07654 23.8724C6.96972 23.6054 6.94415 23.3127 7.00306 23.0312C7.06196 22.7497 7.2027 22.4918 7.40762 22.29C7.53833 22.1574 7.69399 22.0521 7.86562 21.98C8.03726 21.9079 8.22147 21.8705 8.40762 21.87C8.4995 21.8658 8.59035 21.849 8.67762 21.82C8.77378 21.8341 8.87147 21.8341 8.96762 21.82H27.3276C27.5602 21.8252 27.7872 21.7491 27.9698 21.6049C28.1523 21.4607 28.2788 21.2574 28.3276 21.03L30.8676 9.13C30.8994 8.98232 30.8973 8.82936 30.8615 8.68262C30.8256 8.53587 30.757 8.39914 30.6608 8.2827C30.5646 8.16627 30.4432 8.07314 30.3058 8.01032C30.1685 7.9475 30.0186 7.91662 29.8676 7.92H7.21762L6.49762 4.76C6.49908 4.73002 6.49908 4.69998 6.49762 4.67C6.45682 4.55057 6.39595 4.43897 6.31762 4.34C6.27256 4.28831 6.22229 4.2414 6.16762 4.2L5.99762 4.11C5.93223 4.06514 5.86174 4.02821 5.78762 4H5.61762H5.51762H2.12762C1.86241 4 1.60805 4.10536 1.42052 4.29289C1.23298 4.48043 1.12762 4.73478 1.12762 5C1.12762 5.26522 1.23298 5.51957 1.42052 5.70711C1.60805 5.89464 1.86241 6 2.12762 6H4.72762L5.44762 9.2L7.73762 19.93C6.96227 20.0968 6.26747 20.5243 5.76892 21.1411C5.27037 21.7579 4.99816 22.5269 4.99762 23.32C4.99762 24.2386 5.36184 25.1197 6.01043 25.7701C6.65902 26.4206 7.53906 26.7874 8.45762 26.79H9.15762C9.36665 27.4772 9.791 28.079 10.3681 28.5066C10.9451 28.9342 11.6444 29.1651 12.3626 29.1651C13.0809 29.1651 13.7801 28.9342 14.3572 28.5066C14.9343 28.079 15.3586 27.4772 15.5676 26.79H20.5976C20.8067 27.4772 21.231 28.079 21.8081 28.5066C22.3851 28.9342 23.0844 29.1651 23.8026 29.1651C24.5209 29.1651 25.2201 28.9342 25.7972 28.5066C26.3743 28.079 26.7986 27.4772 27.0076 26.79H28.1776C28.4428 26.79 28.6972 26.6846 28.8847 26.4971C29.0723 26.3096 29.1776 26.0552 29.1776 25.79C29.1776 25.5248 29.0723 25.2704 28.8847 25.0829C28.6972 24.8954 28.4428 24.79 28.1776 24.79ZM28.6376 10L26.5276 19.9H9.76762L7.65762 10H28.6376ZM12.3176 27.16C12.0438 27.162 11.7757 27.0825 11.5472 26.9316C11.3187 26.7807 11.1403 26.5653 11.0346 26.3127C10.9289 26.0602 10.9008 25.7819 10.9537 25.5133C11.0066 25.2446 11.1383 24.9978 11.3319 24.8042C11.5254 24.6106 11.7723 24.479 12.0409 24.4261C12.3095 24.3731 12.5878 24.4013 12.8404 24.507C13.0929 24.6127 13.3084 24.7911 13.4592 25.0196C13.6101 25.248 13.6896 25.5162 13.6876 25.79C13.6876 25.9699 13.6522 26.1481 13.5833 26.3143C13.5145 26.4805 13.4136 26.6315 13.2864 26.7587C13.1591 26.886 13.0081 26.9869 12.8419 27.0557C12.6757 27.1246 12.4975 27.16 12.3176 27.16ZM23.8076 27.16C23.5338 27.162 23.2657 27.0825 23.0372 26.9316C22.8087 26.7807 22.6303 26.5653 22.5246 26.3127C22.4189 26.0602 22.3908 25.7819 22.4437 25.5133C22.4966 25.2446 22.6283 24.9978 22.8219 24.8042C23.0155 24.6106 23.2623 24.479 23.5309 24.4261C23.7995 24.3731 24.0778 24.4013 24.3304 24.507C24.5829 24.6127 24.7984 24.7911 24.9492 25.0196C25.1001 25.248 25.1796 25.5162 25.1776 25.79C25.1776 25.9699 25.1422 26.1481 25.0733 26.3143C25.0045 26.4805 24.9036 26.6315 24.7764 26.7587C24.6491 26.886 24.4981 26.9869 24.3319 27.0557C24.1657 27.1246 23.9875 27.16 23.8076 27.16Z" fill="black"/>
        </svg>
    </button>
}

//TODO: change menu to square