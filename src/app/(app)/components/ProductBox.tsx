import React from "react";
import {Media, Product, Product as ProductType} from "@/payload-types";
import Image from "next/image";
import Link from "next/link";



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
            <Link href={`store/${product.id}`}>Name:{product.name} -- ID:{product.id}</Link>
            <p>DESC:{product.description}</p>
            <p>STOCK:{product.stock}</p>
        </div>
    )
}