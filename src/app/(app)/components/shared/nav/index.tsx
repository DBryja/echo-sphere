import "./nav.scss";
import Link from "@components/Link";
import type { MenuItem } from "@/payload-types";
import React from "react";

export default function Nav({ navItems, style }: { navItems: MenuItem[], style: React.CSSProperties }) {
  return (
    <nav className={"header__nav nav"} style={style}>
      {navItems.map((item, i) => {
        if (!item.showInNav) return null;
        return (
          <Link
            key={i}
            className={"nav__item"}
            href={item.path.startsWith("/") ? item.path : "/" + item.path}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
