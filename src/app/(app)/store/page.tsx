"use server";

import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";
import type {Product, Config} from "@/payload-types";

export default async function Page() {
    const payload = await getPayloadHMR({config});
    // noinspection TypeScriptValidateTypes
    const query = await payload.find(
        {
            collection: 'products',
            pagination: false
        }
    );
    const products = query.docs as Product[];

    return (
        <>
            <h1>Store Front</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h2>{product.name} -- {product.id}</h2>
                        <p>{product.description}</p>
                        {/*<p>{product.color.id}</p>*/}
                        <p>{product.stock}</p>
                        {product.relatedProducts && product.relatedProducts?.length > 0 && (
                            <div>
                                Related Products:
                                {product.relatedProducts.map((relatedProduct, key) => (
                                    <span key={key}>{relatedProduct.id}</span>
                                ))}
                            </div>
                        )}

                        {/*<p>Price: ${product.type}</p>*/}
                    </li>
                ))}
            </ul>
        </>
    );
}