import "./header.scss";

import SideCart from "@components/SideCart.tsx";
import Logo from "@components/shared/logo";
import HeaderMenuButton from "@components/buttons/menu";
import OpenCart from "@/app/(app)/components/OpenCart";
import CartButton from "@/app/(app)/components/CartButton";
import Link from "next/link";


export default function Header() {
    return <header className={"header"}>
        <Logo/>
        <HeaderMenuButton/>
        {/*<CartButton/>*/}
        {/*<OpenCart/>*/}
        {/*<nav className={"header__nav nav"}>*/}
        {/*    <Link className={"btn btn--small"} href={"/about-us"}>about us</Link>*/}
        {/*    <Link className={"btn btn--small"} href={"/artists"}>our artists</Link>*/}
        {/*    <Link className={"btn btn--small"} href={"/releases"}>new releases</Link>*/}
        {/*    <Link className={"btn btn--small"} href={"/events"}>events</Link>*/}
        {/*    <Link className={"btn btn--small"} href={"/store"}>store</Link>*/}
        {/*    <Link className={"btn btn--small"} href={"/contact"}>contact</Link>*/}
        {/*</nav>*/}
        <SideCart/>
    </header>
}
