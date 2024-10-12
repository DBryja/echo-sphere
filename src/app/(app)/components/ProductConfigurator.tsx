"use client";
import { useEffect, useState } from "react";
import AddToCart from "@/app/(app)/components/AddToCart";
import type { Product as CartItem } from "use-shopping-cart/core";
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
    const [originPath, setOriginPath] = useState<string>('');
    useEffect(() => {
        setOriginPath(window.location.origin);
    }, []);

    const getImageUrl = (images: ImageObject[]) => {
        if (images && images.length > 0 && images[0].img && images[0].img.url) {
            const imageUrl = images[0].img.url;
            // If the URL is already absolute, return it as is
            if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
                return imageUrl;
            }
            // Otherwise, prepend the origin
            return `${originPath}${imageUrl}`;
        }
        return '';// Return an empty string or a default image URL if no valid image is found
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
                product={{
                    ...selectedVariant,
                    name: product.name,
                    price: product.price,
                    currency: "usd",
                    product_data: {
                        image: product.images[0].img,
                        id: product.id,
                    },
                    price_data: {
                        product_data: {
                            images: [getImageUrl(product.images)],
                        },
                    },
                }}
            />
        </>
    );
}