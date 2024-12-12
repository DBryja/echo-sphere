import { CollectionConfig, getPayload } from "payload";
import config from "@payload-config";
import { v7 } from "uuid";
const currencyRegex = /^\d+(\.\d{1,2})?$/;
// const colorHexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
import colorField from "@/fields/ColorPickerInput/field";
import { ProductCategory, ProductType } from "@/payload-types";

const payload = await getPayload({ config });

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    group: "Store",
    useAsTitle: "unique_name",
    defaultColumns: ["name", "unique_name", "stock", "published"],
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data.variants && Array.isArray(data.variants)) {
          data.stock = data.variants.reduce((sum, variant) => {
            return sum + variant.stock;
          }, 0);
        }

        if (originalDoc.price !== data.price) {
          data.price = Math.round(data.price * 100);
        }
      },
    ],
  },
  fields: [
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description:
          "If unchecked, the product will not be visible on the front end.",
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        },
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          admin: {
            width: "50%",
          },
        },
        colorField,
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "categories",
          type: "relationship",
          relationTo: "product-categories",
          required: true,
          hasMany: true,
        },
        {
          name: "type",
          type: "relationship",
          relationTo: "product-types",
          filterOptions: ({ siblingData }: { siblingData: any }) => {
            if (siblingData.categories && siblingData.categories.length > 0) {
              return {
                "related-categories": {
                  all: siblingData.categories,
                },
              };
            }
            return true;
          },

          validate: async (value, { siblingData }) => {
            const typedSiblingData = siblingData as {
              categories?: string[] | undefined;
            };

            const categories = typedSiblingData.categories;
            if (!categories || categories.length <= 0)
              return "Please select at least one category before selecting a type.";

            if (typeof payload === "undefined") {
              return "An error occurred while validating the product type.";
            }

            if (value) {
              try {
                const productType: ProductType = await payload.findByID({
                  collection: "product-types",
                  id: value,
                });

                const selectedCategories = categories;
                // eslint-disable-next-line
                const productTypeCategories = (
                  productType["related-categories"] || []
                ).map((cat: ProductCategory | string) =>
                  typeof cat === "string" ? cat : cat.id,
                );
                const hasAllCategories = selectedCategories.every((cat) =>
                  productTypeCategories.includes(cat),
                );

                if (!hasAllCategories)
                  return "The selected type does not match the selected categories.";
              } catch (error) {
                console.error("Error in productType validation: ", error);
                return "An error occurred while validating the product type.";
              }
            }
            return true;
          },
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "unique_name",
      label: "Unique name",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description:
          "A unique name used to distinguish items with the same base name in admin panel",
      },
      access: {
        read: ({ req: { user } }) => {
          return user !== null;
        },
      },
    },
    {
      name: "price",
      type: "number",
      required: true,
      validate: (value) => {
        if (value < 0) return "Price must be a positive number.";
        if (typeof value === "string")
          if (!currencyRegex.test(value.toString())) {
            return "Price must be a valid currency format with up to 2 decimal places.";
          }
        return true;
      },
      admin: {
        description:
          "The price of the product in USD (automatically converted to cents).",
      },
    },
    {
      name: "images",
      type: "array",
      // required: true,
      minRows: 1,
      fields: [
        {
          name: "img",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "variants",
      type: "array",
      minRows: 1,
      required: true,
      // TODO: Add a before duplicate hook to ensure that the sku is unique
      labels: {
        singular: "Size",
        plural: "Sizes",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "stock",
              type: "number",
              required: true,
              admin: {
                width: "200px",
              },
            },
            {
              name: "size",
              type: "select",
              options: [
                {
                  label: "Small",
                  value: "s",
                },
                {
                  label: "Medium",
                  value: "m",
                },
                {
                  label: "Large",
                  value: "l",
                },
                {
                  label: "Extra Large",
                  value: "xl",
                },
                {
                  label: "One Size",
                  value: "os",
                },
              ],
              hooks: {
                beforeChange: [
                  ({ value, siblingData }) => {
                    const parts = siblingData.sku.split("_");
                    parts.pop();
                    const baseSkuPart = siblingData.sku
                      ? parts.join("_")
                      : "PRODUCT";
                    siblingData.sku = `${baseSkuPart}_${value}`.toUpperCase();
                    return value;
                  },
                ],
              },
              required: true,
            },
          ],
        },
        {
          name: "sku",
          type: "text",
          required: true,
          unique: true,
          admin: {
            description: "NAME_COLOR_SIZE (s, m, l, xl, os)",
          },
        },
        {
          name: "sku_id",
          type: "text",
          required: true,
          defaultValue: () => v7(),
        },
        {
          name: "price_id",
          type: "text",
          required: true,
          defaultValue: () => v7(),
        },
      ],
      hooks: {
        beforeDuplicate: [
          ({ data }) => {
            if (!data) {
              return data;
            }
            return {
              ...data,
              sku: `${data.sku}_copy`,
              sku_id: v7(),
              price_id: v7(),
            };
          },
        ],
      },
      // admin: {
      //     components: {
      //         RowLabel: ({ data, index }) => {
      //             return data?.sku || `Slide ${String(index).padStart(2, '0')}`
      //         },
      //     },
      // },
    },
    {
      name: "relatedProducts",
      label: "Related Products",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "relationType",
              type: "select",
              required: true,
              options: [
                {
                  label: "Colorway",
                  value: "colorway",
                },
                {
                  label: "Recommended",
                  value: "recommended",
                },
              ],
            },
            {
              name: "item",
              type: "relationship",
              relationTo: "products",
              hasMany: false,
              filterOptions: ({ id }) => {
                return { id: { not_equals: id } };
              },
            },
            // @ts-ignore
            {
              ...colorField,
              admin: {
                ...colorField.admin,
                condition: (data, siblingData) => {
                  return siblingData.relationType === "colorway";
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "product-tags",
      hasMany: true,
    },
    {
      name: "stock",
      label: "Total Stock",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "The total stock of all variants combined.",
        readOnly: true,
      },
    },
  ],
};
