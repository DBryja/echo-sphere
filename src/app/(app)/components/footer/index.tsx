import { fetchContactData, fetchNavItems } from "@utils/data";
import "./footer.scss";
import Logo from "@components/shared/logo/logo-props";
import Link from "@components/Link";
import { headers } from "next/headers";
import Icon, { Socials } from "@components/shared/socialIcon";

export default async function Footer() {
  const [navItems, contactData] = await Promise.all([
    fetchNavItems(),
    fetchContactData(),
  ]);
  const { email, "phone-number": phoneNumber, address, socials } = contactData;
  const socialsList = [];
  //@ts-ignore // ignoring due to undefined coming from payload types, this is still checked in the function
  for (const [key, value] of Object.entries(socials) as [Socials, string][]) {
    if (key && value)
      socialsList.push(<Icon href={value} social={key} key={key} />);
  }
  const isPhone = headers().get("x-device-type") === "phone";
  const splittedAddress = address.split(", ");

  return (
    <footer className={"footer"}>
      <div className={"footer__decor"}>
        <Logo textColor={"black"} iconColor={"red"} />
        <div className={"footer__decor__socials"}>{...socialsList}</div>
      </div>
      <div className={"footer__links"}>
        {navItems.map((item, index) => (
          <Link
            key={index}
            className={"footer__link"}
            href={item.path.startsWith("/") ? item.path : `/${item.path}`}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className={"footer__contact contact-comp"}>
        {!isPhone && <h3 className={"footer__contact__heading"}>Contact</h3>}
        <p className={"footer__contact__item"}>{email}</p>
        <p className={"footer__contact__item"}>{phoneNumber}</p>
        <p className={"footer__contact__item"}>
          {isPhone ? (
            <>
              {splittedAddress[0] + ","} <br /> {splittedAddress[1]}
            </>
          ) : (
            address
          )}
        </p>
      </div>
      <div className={"footer__copyrights"}>
        <p>2024, Echo Sphere. All rights reserved.</p>
        <a href={"https://mockupfree.co/"}>mockupfree.co</a>
      </div>
    </footer>
  );
}
