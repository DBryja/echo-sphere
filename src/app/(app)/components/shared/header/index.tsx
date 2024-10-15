import "./header.scss";
import Link from "@components/Link";
import Logo from "@components/shared/logo/logo-css";
import NavContainer from "@components/shared/nav-container";
import SideCart from "@components/SideCart";
import {ContactDatum, MenuItem} from "@/payload-types";
import Menu from "@components/menu";
import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";


export default async function Header() {
   const navItems = await getNavItems();
    const contactData = await getContactData();

    return <header className={"header"} data-state={"nav"}>
        <Link href={"/"}><Logo iconColor={"red"} textColor={"black"}/></Link>
        <NavContainer navItems={navItems} contactData={contactData}/>
        <SideCart/>
    </header>
}


async function getNavItems(): Promise<MenuItem[]> {
    const payload = await getPayloadHMR({ config });
    const query = await payload.find({
        collection: "menu-items",
        pagination: false,
        sort: "order"
    });
    return query.docs as MenuItem[];
}
async function getContactData(): Promise<MenuItem[]> {
    const payload = await getPayloadHMR({config});
    const query = await
        payload.find({
            collection: "contact-data",
            pagination: false
        });
    return query.docs[0] as ContactDatum;
}
