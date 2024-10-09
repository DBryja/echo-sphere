import "./nav.scss";
import Link from "next/link";

export default function Nav() {
    return (
        <nav className={"header__nav nav"}
             // style={{opacity: hidden, visibility: hidden?"visible":"hidden"}}
        >
            <Link className={"btn btn--small"} href={"/about-us"}>about us</Link>
            <Link className={"btn btn--small"} href={"/artists"}>our artists</Link>
            <Link className={"btn btn--small"} href={"/releases"}>new releases</Link>
            <Link className={"btn btn--small"} href={"/events"}>events</Link>
            <Link className={"btn btn--small"} href={"/store"}>store</Link>
            <Link className={"btn btn--small"} href={"/contact"}>contact</Link>
    </nav>
    )
}