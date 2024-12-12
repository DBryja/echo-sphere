import type { CollectionConfig } from "payload";

export const ProductTags: CollectionConfig = {
  slug: "product-tags",
  fields: [
    {
      name: "name",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "importance",
      type: "number",
      admin: {
        description:
          "The higher the number, the higher the item is on the shop homepage.",
      },
    },
  ],
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
    group: "Tags",
  },
};
