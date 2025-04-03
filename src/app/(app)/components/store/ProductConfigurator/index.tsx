"use client";
import {  useState } from "react";
import AddToCart from "@components/store/AddToCart";
import type { Product } from "@/payload-types";
import "./ProductConfigurator.scss"

interface ImageObject {
  img: {
    url: string;
    alt: string;
  };
  id: string;
}

export default function ProductConfigurator({ product }: { product: Product }) {
  const [selectedSku, setSelectedSku] = useState<string>(() => {
    const inStockVariant = product.variants.find(v => v.stock > 0);
    return inStockVariant?.sku || product.variants[0].sku;
  });

  const getImageUrl = (images: ImageObject[]) => {
    if (images && images.length > 0 && images[0].img && images[0].img.url) {
      // If the URL is already absolute, check if we are in development mode
      const imageUrl = images[0].img.url;
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      }
      return `https://echo-sphere-next.vercel.app${imageUrl}`;
    }
    return '';
  };

  const selectedVariant = product.variants.find(v => v.sku === selectedSku) || product.variants[0];

  const handleVariantChange = (sku: string) => {
    setSelectedSku(sku);
  };

  return (
    <>
      <div className={"product-page__sizes"}>
      {product.variants.map((variant: Product["variants"][0], i) => {
        const isOneSize = variant.size === "os";
        return (
          <label key={i} className={`radio-size ${isOneSize?"radio-size--single":""}`} >
            <input
              type="radio"
              name="size"
              id={`size_${variant.size}`}
              value={variant.sku}
              disabled={variant.stock < 1}
              checked={selectedSku === variant.sku}
              onChange={(e) => handleVariantChange(variant.sku, e)}
            />
            <span>
            {variant.size === "os" ? "One Size" : variant.size}
          </span>
          </label>)
      })}
    </div>
      <AddToCart
        disabled={selectedVariant.stock === 0}
        product={{
          ...selectedVariant,
          name: product.name,
          price: product.price,
          currency: "usd",
          product_data: {
            image: product.images![0].img,
            id: product.id,
          },
          price_data: {
            product_data: {
              images: [getImageUrl(product.images as ImageObject[])],
            },
          },
        }}
      />
    </>
  );
}