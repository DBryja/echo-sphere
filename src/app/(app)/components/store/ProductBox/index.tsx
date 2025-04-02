import React from "react";
import { Product as ProductType } from "@/payload-types";
import Image from "@components/Image";
import Link from "next/link";
import { formatCurrencyString, getImageUrl, getImgAlt } from "@app/utils";
import Index from "@components/store/ColorwayDot";
import "./ProductBox.scss"

const seperateStrings = (arr: (string | null)[], separator:string = " / ") => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      str += arr[i];
      if (i !== arr.length - 1) str += separator;
    }
  }
  return str;
}

export default function ProductBox({ product }: { product: ProductType }) {
  // const categories = product.categories.map((cat)=>typeof cat === "string"?cat:cat.name)
  const availableSizes = product.variants.map((variant)=>{
    if(variant.stock <= 0) return null;
    if (variant.size === "os") return "onesize";
    return variant.size;
  });

  return (
    <article className="product-box">
      <Link href={`/store/${product.id}`} className={"product-box__img"}>
        {product.images && product.images.length > 0 && product.images[0].img && (
          <Image
            src={getImageUrl(product.images[0].img)}
            alt={getImgAlt(product.images[0].img)}
            width={300}
            height={300}
          />
        )}
      </Link>
      <Link href={`/store/${product.id}`} className={"product-box__info"}>
        {/*<p className={"product-box__categories"}>{seperateStrings(categories)}</p>*/}
        <h4 className={"product-box__name"}>{product.name}</h4>
        <p className={"product-box__sizes"}>{seperateStrings(availableSizes, "/")}</p>
      </Link>
      <p className={"product-box__price"}>
          {product.price && formatCurrencyString(product.price, "USD", false)}
        </p>
      <div className="product-box__colorways">
        {product.relatedProducts?.map((related)=>{
          if (
            !related.item ||
            related.relationType !== "colorway" ||
            typeof related.item === "string"
          ) return null;
          return <Index key={related.item.id} relatedItem={related.item}></Index>
        })}
      </div>
    </article>
  );
}
