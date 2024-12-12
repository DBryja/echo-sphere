import type { CollectionConfig } from "payload";
import type { Product } from "@/payload-types";
const updateStock = async (
  payload,
  items: Array<{ product: { id: string }; sku: string; quantity: number }>,
  increment: boolean = false,
) => {
  // Group items by product ID
  const itemsByProduct = items.reduce(
    (acc, item) => {
      if (!acc[item.product.id]) {
        acc[item.product.id] = [];
      }
      acc[item.product.id].push(item);
      return acc;
    },
    {} as Record<string, typeof items>,
  );

  const updatePromises = Object.entries(itemsByProduct).map(
    async ([productId, productItems]) => {
      try {
        // Fetch the current product
        const product: Product = await payload.findByID({
          collection: "products",
          id: productId,
        });

        if (!product) {
          throw new Error(`Product not found: ${productId}`);
        }

        // Update all relevant variants' stock
        const updatedVariants = product.variants.map((variant) => {
          const item = productItems.find((i) => i.sku === variant.sku);
          if (item) {
            const newStock = increment
              ? variant.stock + item.quantity
              : Math.max(0, variant.stock - item.quantity);
            return { ...variant, stock: newStock };
          }
          return variant;
        });

        // Update the product with the new variants and total stock
        const result = await payload.update({
          collection: "products",
          id: productId,
          data: {
            variants: updatedVariants,
          },
        });

        console.info(
          `${increment ? "Restored" : "Reserved"} stock for product ${productId}`,
        );
        console.info("Updated product:", JSON.stringify(result, null, 2));
        return result;
      } catch (error) {
        console.error(`Error updating stock for product ${productId}:`, error);
        throw error;
      }
    },
  );
};

export const Orders: CollectionConfig = {
  slug: "orders",
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req: { payload } }) => {
        if (operation === "create") {
          // Reserve stock when order is created
          await updateStock(payload, doc.items, false);
        } else if (operation === "update") {
          if (previousDoc.status === "pending" && doc.status === "paid") {
            // Do nothing, stock was already decremented on create
            console.info("Payment successful, stock already reserved");
          } else if (doc.status === "cancelled") {
            // Restore stock if order is cancelled
            await updateStock(payload, doc.items, true);
          }
        }
      },
    ],
  },
  fields: [
    {
      name: "date",
      type: "date",
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Pending",
          value: "pending",
        },
        {
          label: "Cancelled",
          value: "cancelled",
        },
        {
          label: "Paid",
          value: "paid",
        },
        {
          label: "Shipped",
          value: "shipped",
        },
        {
          label: "Delivered",
          value: "delivered",
        },
        {
          label: "Return Requested",
          value: "return-requested",
        },
        {
          label: "Returned",
          value: "returned",
        },
      ],
    },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        {
          name: "sku",
          type: "text",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          required: true,
        },
        {
          name: "price",
          type: "number",
          required: true,
        },
        {
          name: "value",
          type: "number",
          required: true,
        },
        {
          name: "size",
          type: "text",
        },
      ],
    },
    {
      name: "total",
      type: "number",
    },
    {
      name: "session_id",
      type: "text",
    },
    {
      name: "shippingAddress",
      type: "relationship",
      relationTo: "shipping-addresses",
    },
  ],
  admin: {
    useAsTitle: "date",
    defaultColumns: ["date", "status"],
    group: "Store",
  },
};
