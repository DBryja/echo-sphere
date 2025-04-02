import { CollectionConfig } from "payload";
import { v7 } from "uuid";
const currencyRegex = /^\d+(\.\d{1,2})?$/;
import colorField from "@/fields/ColorPickerInput/field";
import { ProductCategory, ProductType } from "@/payload-types";

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
          // filterOptions: ({siblingData}:{siblingData: any}) => {
          //   // console.info("SIBLING DATA:", siblingData);
          //   const categories = siblingData.categories.map((cat: string | ProductCategory) => typeof cat === 'string' ? cat : cat.id);
          //   console.info("CATEGORIES:", categories);
          //   const filter = {
          //     'related-categories': {
          //       in: siblingData.categories
          //     }
          //   }
          //   console.log("FILTER:", filter);
          //   return filter;
          //   // return {
          //   //   or: [
          //   //     categories.map((catId: string) => ({
          //   //       'related-categories': {
          //   //         contains: catId
          //   //       }
          //   //     }))
          //   //   ]
          //   // };
          // },
          // filterOptions: ({ siblingData,  }: { siblingData: any }) => {
          //   if (siblingData.categories && Array.isArray(siblingData.categories) && siblingData.categories.length > 0) {
          //     // Extract just the IDs if categories are objects
          //     const categoryIds = siblingData.categories.map((cat: string | ProductCategory) =>
          //       typeof cat === 'string' ? cat : cat.id
          //     );
          //
          //     // Use the contains operator which works for arrays
          //     return {
          //       'related-categories': {
          //         contains: categoryIds
          //       }
          //     };
          //   }
          //   return true;
          // },

          validate: async (value: any, { siblingData, req: { payload } }: any) => {
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
                return "An error occurred while validating the product type: " + error;
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
      // @ts-ignore
      validate: (value: number) =>  {
        if (value < 0) return "Price must be a positive number.";
        if (!currencyRegex.test(value.toString())) {
          return "Price must be a valid currency format with up to 2 decimal places.";
        }
        return true;
      },
      admin: {
        description:
        "The price on the read is in cents. When entering a new price or editing existing one please enter it in USD.",
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
