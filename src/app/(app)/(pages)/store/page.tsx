"use server";

import "./Store.scss"
import { getPayload } from "payload";
import config from "@payload-config";
import type { Product } from "@/payload-types";
import ProductBox from "@components/store/ProductBox";
import Image from "next/image";
import Logo from "@components/shared/logo/logo-props";
export default async function Page() {
  const payload = await getPayload({ config });
  // noinspection TypeScriptValidateTypes
  const query = await payload.find({
    collection: "products",
    where: {
      stock: { greater_than: 0 },
      published: { equals: true },
    },
    pagination: false,
  });
  const products = query.docs as Product[];

  return (
    <>
      <section className={"store-hero"}>
        <div className={"store-hero__container"}>
          <div className={"store-hero__square"}>
            <Image className="store-hero__square__bg"
                   src={"/img/store/hero-square.png"}
                   alt={"Backside of a person wearing a hoodie"}
                   fill
            />
            <Logo textColor={"white"} iconColor={"red"}/>
          </div>
          <div className={"store-hero__banner"}>
            <Image className="store-hero__banner__bg"
                   src={"/img/store/hero-banner.png"}
                   alt={"Young people sitting on a bench"}
                   fill
            />
            <h1 className={"store-hero__heading"}>SHOP</h1>
            <h3 className={"store-hero__desc"}>High-Quality Clothing, Real Music Support</h3>
          </div>
        </div>
      </section>
      <section className={"store-items"}>
        {/*<h3 className={"store-items__heading"}>/ALL</h3>*/}
        <div className={"store-items__container"}>
          {products.map((product, i) => {
            return (
              <ProductBox
                key={i}
                product={product}
              />
            );
          })}
          <h4 className={"store-items__decor"}>STREETWEAR</h4>
        </div>
      </section>
    </>
  );
}
