import React, {useState, useEffect} from 'react'
import {Metadata} from 'next'
import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";
import Image from "next/image";
import AddToCart from "@/app/(app)/components/AddToCart";
import {formatCurrencyString} from "use-shopping-cart";
import type {Product} from "@/payload-types"
import ProductConfigurator from "@/app/(app)/components/ProductConfigurator";
import {Media} from "@/payload-types";
import Link from "next/link";
import ProductBox from "@/app/(app)/components/ProductBox";


export default async function ProductPage({params: {slug}}) {
    const payload = await getPayloadHMR({config});
    //@ts-ignore
    const item:Product = await payload.findByID({id: slug, collection: 'products'});
    const sku_id = "abcdefgh123"

    return (
        <div style={{width: "50%"}}>
            <h1>Product Page</h1>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            {/*<p>{item.color}</p>*/}
            <div>
                {item.images.map((image, i) => {
                    if (!image) return null;
                    if (typeof image.img === 'string') return <Image key={i} src={image.img} alt={item.name} width={300} height={300}/>
                    return <Image key={i}  src={image.img?.url!} alt={image.img?.alt!} width={300} height={300}/>
                })}
            </div>
            <div style={{background: "lightslategray"}}>
                {item.relatedProducts?.map((related, i) => {
                      if (related.relationType === 'colorway' && related.item && typeof(related.item)!=='string')
                          return <Link key={i} href={`/store/${related.item.id}`}><div style={{width: "25px", height: "25px", borderRadius:"50%", background: `#${related.colorHEX ? related.colorHEX : "FFFFFF"}`}}/></Link>
                    else return <></>
                })}
            </div>
            <div>
                {item.price}
            </div>
            <ProductConfigurator product={item}/>

            <div>
                {
                item.relatedProducts?.map((related, i) => {
                    if (related.relationType === 'recommended' && related.item && typeof(related.item)!=='string')
                        return <ProductBox key={i} product={related.item}/>
                    else return <></>
                })
                }
            </div>
        </div>
    )
}
