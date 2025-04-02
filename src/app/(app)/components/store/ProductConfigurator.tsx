"use client";
import {  useState } from "react";
import AddToCart from "@components/store/AddToCart";
import type { Product } from "@/payload-types";

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
      // Otherwise, prepend the origin
      return `https://echo-sphere-next.vercel.app${imageUrl}`;
    }
    return ''; // Return an empty string or a default image URL if no valid image is found
  };

    const selectedVariant = product.variants.find(v => v.sku === selectedSku) || product.variants[0];

    const handleVariantChange = (sku: string) => {
        setSelectedSku(sku);
    };

    return (
        <>
            {product.variants.map((variant: Product["variants"][0], i) => (
                <label key={i}>
                    <input
                        type="radio"
                        name="size"
                        id={`size_${i}`}
                        value={variant.sku}
                        disabled={variant.stock === 0}
                        checked={selectedSku === variant.sku}
                        onChange={() => handleVariantChange(variant.sku)}
                    />
                    {variant.size} -- {variant.stock}
                </label>
            ))}
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