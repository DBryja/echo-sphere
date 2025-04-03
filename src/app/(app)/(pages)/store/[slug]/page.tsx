import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Product } from "@/payload-types";
import ProductImages from "@components/store/ProductImages";
import ProductConfigurator from "@components/store/ProductConfigurator";
import Link from "next/link";
import { formatCurrencyString } from "@/app/(app)/utils";
import "./ProductPage.scss"
import ColorwayDot from "@components/store/ColorwayDot";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({params}: ProductPageProps) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const item: Product = await payload.findByID({
    id: slug,
    collection: "products",
  });

  return (
    <>
    <article className={"product-page"}>
      <Link href={"/store"} className={"product-page__back"}>
        BACK TO STORE
      </Link>
      <ProductImages images={item.images} productName={item.name} />
      <div className={"product-page__info"}>
        <h1 className={"product-page__name"}>{item.name}</h1>
        <p className={"product-page__desc"}>{item.description}</p>
        <ProductConfigurator product={item} /> {/* <>.product-page__sizes, .product-page__buttons</> */}
        <div className={"product-page__colors"}>
          <span className={"product-page__colors__label"}>Color:</span>
          {item.relatedProducts?.map((related)=>{
            if (
              !related.item ||
              related.relationType !== "colorway" ||
              typeof related.item === "string"
            ) return null;
            return <ColorwayDot key={related.item.id} relatedItem={related.item}></ColorwayDot>
          })}
          <ColorwayDot relatedItem={item}/>
        </div>
        <h3 className={"product-page__price"}>{formatCurrencyString(item.price, "USD", false)}</h3>
      </div>
      <div className={"product-page__related"}>
      </div>
      <div className={"product-page__banner"}></div>
    </article>
    </>
  )
}
