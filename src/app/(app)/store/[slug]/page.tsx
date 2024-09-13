// import React from 'react'
// import {Metadata} from 'next'
import {Product, Product as ProductType} from "@/payload-types";
import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";
import Image from "next/image";
import AddToCart from "@/app/(app)/components/AddToCart";
import {formatCurrencyString} from "use-shopping-cart";


export default async function ProductPage({params: {slug}}) {
    const payload = await getPayloadHMR({config});
    //@ts-ignore
    const item = await payload.findByID({id: slug, collection: 'products'});
    // const sku_id = item.variants["stock-details"].sku;
    const sku_id = "abcdefgh123"
    console.info("SD: ",item.variants["stock-details"]);

    return (
        <>
            <h1>Product Page</h1>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.color}</p>
            <div>
                {item.images.map(image => {
                    if (!image) return null;
                    if (typeof image === 'string') return <Image src={image} alt={item.name} width={300} height={300}/>
                    return <Image src={image.img.url} alt={image.img.alt} width={300} height={300}/>
                })}
            </div>
            <div>
                {item.price}
            </div>
            <select>
                <option disabled selected value> -- select size -- </option>
                {item.variants.map(variant =>
                    variant["stock-details"].map(stockDetail => (
                        <option key={stockDetail.id} value={stockDetail.sku} disabled={stockDetail.stock === 0}>
                            {stockDetail.size} -- {stockDetail.stock}
                        </option>
                    ))
                )}
            </select>

            {/*//TODO: Update sku and price_id*/}
            <AddToCart product={{id: item.id, price_id: sku_id, sku_id: sku_id, sku: sku_id, name: item.name, price: Math.round(item.price * 100), currency: "USD"}} />
        </>
    )
}
