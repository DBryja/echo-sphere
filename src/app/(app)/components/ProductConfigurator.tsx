"use client";
import { useEffect, useState } from "react";
import AddToCart from "@/app/(app)/components/AddToCart";
import type { Product as CartItem } from "use-shopping-cart/core";
import type { Product } from "@/payload-types";

export default function ProductConfigurator({ product }: { product: Product }) {
    const [selectedSku, setSelectedSku] = useState<string>(() => {
        const inStockVariant = product.variants.find(v => v.stock > 0);
        return inStockVariant?.sku || product.variants[0].sku;
    });

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
                product={{
                    ...selectedVariant,
                    name: product.name,
                    price: Math.round(product.price * 100),
                    currency: "USD",
                    product_data: {
                        image: product.images[0].img,
                    },
                }}
            />
        </>
    );
}