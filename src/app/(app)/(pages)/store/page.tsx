"use server";

import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import type { Product } from "@/payload-types";
import ProductBox from "@components/ProductBox";
import CartButton from "@components/CartButton";
export default async function Page() {
  const payload = await getPayloadHMR({ config });
  // noinspection TypeScriptValidateTypes
  const query = await payload.find({
    collection: "products",
    where: {
      stock: { $gt: 0 },
      published: true,
    },
    pagination: false,
  });
  const products = query.docs as Product[];

  return (
    <>
      <h1>Store Front</h1>
      <ul>
        {products.map((product) => (
          <ProductBox key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
}
