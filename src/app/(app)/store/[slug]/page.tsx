import React, {useState, useEffect} from 'react'
import {Metadata} from 'next'
import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";
import Image from "next/image";
import AddToCart from "@/app/(app)/components/AddToCart";
import {formatCurrencyString} from "use-shopping-cart";
import ProductConfigurator from "@/app/(app)/components/ProductConfigurator";


export default async function ProductPage({params: {slug}}) {
    const payload = await getPayloadHMR({config});
    //@ts-ignore
    const item = await payload.findByID({id: slug, collection: 'products'});
    const sku_id = "abcdefgh123"

    return (
        <>
            <h1>Product Page</h1>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.color}</p>
            <div>
                {item.images.map((image, i) => {
                    if (!image) return null;
                    if (typeof image === 'string') return <Image key={i} src={image} alt={item.name} width={300} height={300}/>
                    return <Image key={i}  src={image.img.url} alt={image.img.alt} width={300} height={300}/>
                })}
            </div>
            <div>
                {item.price}
            </div>
            <ProductConfigurator product={item}/>
        </>
    )
}
