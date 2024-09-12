import React from "react";
import {Product, Product as ProductType} from "@/payload-types";

export default function ProductBox({name, category, description, tags, stock, variants}: {product: ProductType}) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{category}</p>
            <p>{description}</p>
            <p>Colors: {variants.map((variant, key)=>{
                return <span key={key}>{variant.color}</span>
            })}</p>
            <div>
            </div>
        </div>
    )
}