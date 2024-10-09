import "./header.scss";

import SideCart from "@components/SideCart.tsx";
import Logo from "@components/shared/logo";
import NavButtonContainer from "@components/shared/nav-button-container";

import OpenCart from "@/app/(app)/components/OpenCart";
import CartButton from "@/app/(app)/components/CartButton";


export default function Header() {
    return <header className={"header"}>
        <Logo/>
        <NavButtonContainer/>
        {/*<CartButton/>*/}
        {/*<OpenCart/>*/}
        <SideCart/>
    </header>
}

