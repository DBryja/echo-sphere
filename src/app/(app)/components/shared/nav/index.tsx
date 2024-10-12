import "./nav.scss";
import Link from "next/link";
import type {MenuItem} from "@/payload-types";

export default function Nav({navItems}:{navItems: MenuItem[]}) {
    return (
        <nav className={"header__nav nav"}>
            {navItems.map((item, i) => {
                if (!item.showInNav) return null;
                return (
                    <Link key={i} className={"btn btn--small"}
                          href={item.path.startsWith("/") ? item.path : "/"+item.path}>
                        {item.name}
                    </Link>
                );
            })}
        </nav>
    );
}