import React from "react";
import {Media, Product, Product as ProductType} from "@/payload-types";
import Image from "next/image";



export default function ProductBox({product}: { product: ProductType }) {
    console.log(product);
    const relatedProducts = product.relatedProducts as Product[];
    console.log(relatedProducts);

    return (
        <div>
            <div>
                {product.images.map(({img}) => {
                    if (!img) return null;
                    if (typeof img === "string")
                        return <Image key={img} src={img} alt={product.name} width={150} height={150}/>
                    return <Image key={img.id} src={img.url || ''} alt={img.alt} width={150} height={150}/>
                })};
            </div>
            <h2>Name:{product.name} -- ID:{product.id}</h2>
            <p>DESC:{product.description}</p>
            <p>STOCK:{product.stock}</p>
        </div>
    )
}