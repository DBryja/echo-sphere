import "./header.scss";
import Link from "@components/Link";
import Logo from "@components/shared/logo/logo-props";
import NavContainer from "@components/shared/nav-container";
import SideCart from "@components/SideCart";
import { fetchContactData, fetchNavItems } from "@utils/data";
export default async function Header() {
  const [navItems, contactData] = await Promise.all([
    fetchNavItems(),
    fetchContactData(),
  ]);

  return (
    <header className={"header"} data-state={"nav"}>
      <Link href={"/"}>
        <Logo iconColor={"red"} textColor={"black"} />
      </Link>
      <NavContainer navItems={navItems} contactData={contactData} />
      <SideCart />
    </header>
  );
}
