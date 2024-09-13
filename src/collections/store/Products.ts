import type { CollectionConfig } from 'payload'
import {v7} from 'uuid';
import {relationship} from "payload/dist/fields/validations";
import {SelectColors} from "../../fields/SelectColors/field";

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        group: "Store",
        useAsTitle: "name",
        defaultColumns: ["name", "color", "stock", "published"],
    },
    hooks: {
        beforeChange: [
            ({ data }) => {
                // Calculate total stock across all variants
                if (data.variants && Array.isArray(data.variants)) {
                    const totalStock = data.variants.reduce((sum, variant) => {
                        if (variant['stock-details'] && Array.isArray(variant['stock-details'])) {
                            return sum + variant['stock-details'].reduce((variantSum, stockDetail) => {
                                return variantSum + (stockDetail.stock || 0);
                            }, 0);
                        }
                        return sum;
                    }, 0);
                    // Update the stock field with the calculated total
                    data.stock = totalStock;
                }
                return data;
            }
        ]
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
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
            filterOptions: ({value ,siblingData}) =>{
                if (siblingData.categories && siblingData.categories.length >0){
                    // console.log("siblingData.categories: ", siblingData.categories);
                    // console.log("value: ", value);
                    return {
                        'related-categories': {
                            all: siblingData.categories
                        }
                    }
                }
                return {}
            },
            validate : async (value, {payload, siblingData}) => {
                const typedSiblingData = siblingData as { categories?: string[] | undefined }

                const categories = typedSiblingData.categories;
                if(!categories || categories.length <= 0) return "Please select at least one category before selecting a type.";

                if (typeof payload === 'undefined'){
                    return false;
                }

                if(value){
                    try {
                        const productType = await payload.findByID({
                            collection: "product-types",
                            id: value
                        });

                        const selectedCategories = categories;
                        const productTypeCategories = productType.categories.map(cat => cat.id || cat)
                        const hasAllCategories = selectedCategories.every(cat =>
                            productTypeCategories.includes(cat)
                        )

                        if(!hasAllCategories) return "The selected type does not match the selected categories.";
                    } catch (error) {
                        console.error("Error in productType validation: ", error)
                        return "An error occurred while validating the product type.";
                    }
                }
                return true
            },
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            required: true,
        },
        {
            name: "color",
            type: "text",
        },
        {
            name: "price",
            type: "number",
            required: true,
        },
        {
            name: "images",
            type: "array",
            required: true,
            minRows: 1,
            fields: [
                {
                    name: "img",
                    type: "upload",
                    relationTo: "media",
                }],
        },
        {
            name: "variants",
            type: "array",
            minRows: 1,
            required: true,
            labels: {
                singular: "Variant",
                plural: "Variants",
            },
            fields:[
                {
                    name: "stock-details",
                    type: "array",
                    required: true,
                    minRows: 1,
                    fields: [
                        {
                            name: "stock",
                            type: "number",
                            required: true,
                        },
                        {
                            name: "size",
                            type: "select",
                            options: [
                                {
                                    label: "Small",
                                    value: "sm",
                                },
                                {
                                    label: "Medium",
                                    value: "md",
                                },
                                {
                                    label: "Large",
                                    value: "lg",
                                },
                                {
                                    label: "Extra Large",
                                    value: "xl",
                                },
                                {
                                    label: "One Size",
                                    value: "one-size",
                                }
                            ],
                        },
                        {
                            name: "sku",
                            type: "text",
                            required: true,
                            defaultValue: () => v7(),
                        },
                    ]
                },
            ]
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
                            options: [
                                {
                                    label: "Colorway",
                                    value: "colorway",
                                },
                                {
                                    label: "Recommended",
                                    value: "recommended",
                                }
                            ]
                        },
                        {
                            name: "items",
                            type: "relationship",
                            relationTo: "products",
                            filterOptions: ({id})=>{return {id: {not_equals: id}}}
                        }
                    ]
                }
            ]
        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "product-tags",
            hasMany: true,
        },
        {
            name: "published",
            type: "checkbox",
            defaultValue: true,
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
        }
    ],
}
