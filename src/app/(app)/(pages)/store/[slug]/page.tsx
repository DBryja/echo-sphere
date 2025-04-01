import React from "react";
// import {Metadata} from 'next'
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "@components/Image";
import type { Product } from "@/payload-types";
import ProductConfigurator from "@components/ProductConfigurator";
import Link from "next/link";
import ProductBox from "@components/ProductBox";
import { formatCurrencyString } from "@/app/(app)/utils";
import "./ProductPage.scss"

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
    <article className={"product-page"}>
      <h2>Product Page</h2>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      {/*<p>{item.color}</p>*/}
      <div>
        {item.images &&
          item.images.map((image, i) => {
            if (!image) return null;
            if (typeof image.img === "string")
              return (
                <Image
                  key={i}
                  src={image.img}
                  alt={item.name}
                  width={300}
                  height={300}
                />
              );
            return (
              <Image
                key={i}
                src={image.img?.url!}
                alt={image.img?.alt!}
                width={300}
                height={300}
              />
            );
          })}
      </div>
      <div style={{ background: "lightslategray" }}>
        {item.relatedProducts?.map((related, i) => {
          if (
            related.relationType === "colorway" &&
            related.item &&
            typeof related.item !== "string"
          )
            return (
              <Link key={i} href={`/store/${related.item.id}`}>
                <div
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    background: `#${related.colorHEX ? related.colorHEX : "FFFFFF"}`,
                  }}
                />
              </Link>
            );
          else return null;
        })}
      </div>
      <div>{formatCurrencyString({ value: item.price })}</div>
      <ProductConfigurator product={item} />

      <div>
        {item.relatedProducts?.map((related, i) => {
          if (
            related.relationType === "recommended" &&
            related.item &&
            typeof related.item !== "string"
          )
            return <ProductBox key={related.item.id} product={related.item} />;
          else return null;
        })}
      </div>
    </article>
  );
}
