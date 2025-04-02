import "./header.scss";
import Link from "@components/Link";
import Logo from "@components/shared/logo/logo-css";
import NavContainer from "@components/shared/nav-container";
import SideCart from "@components/store/SideCart";
import { fetchContactData, fetchNavItems } from "@utils/data";
import HideLogoAnim from "@components/shared/logo/hideLogo-anim";
export default async function Header() {
  const [navItems, contactData] = await Promise.all([
    fetchNavItems(),
    fetchContactData(),
  ]);

  return (
    <>
      <header className={"header"} data-state={"nav"}>
        <Link href={"/"}>
          {/*<Logo iconColor={"red"} textColor={"black"} />*/}
          <Logo />
        </Link>
        <NavContainer navItems={navItems} contactData={contactData} />
        <SideCart />
      </header>
      <HideLogoAnim />
    </>
  );
}
