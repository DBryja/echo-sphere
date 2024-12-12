import type { CollectionConfig } from "payload";

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name"],
    group: "Tags",
  },
};
