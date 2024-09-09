import type { CollectionConfig } from 'payload'
import {v7} from 'uuid';

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        group: "Store",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "category",
            type: "relationship",
            relationTo: "product-categories",
            required: true,
        },
        {
            name: "type",
            type: "relationship",
            relationTo: "product-types",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            required: true,
        },
        {
            name: "variants",
            type: "array",
            required: true,
            labels: {
                singular: "Variant",
                plural: "Variants",
            },
            fields:[
                {
                    name: "color",
                    type: "text",
                },
                {
                    name: "images",
                    type: "array",
                    required: true,
                    fields: [
                        {
                            name: "img",
                            type: "upload",
                            relationTo: "media",
                        }]
                },
                {
                    name: "price",
                    type: "number",
                    required: true,
                },
                {
                    name: "stock-details",
                    type: "array",
                    required: true,
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
            name: "relatedProducts",
            type: "relationship",
            relationTo: "products",
            hasMany: true,
            admin: {
                description: "Link other colorways of this product."
            }
        },
        {
            name: "stock",
            label: "Total Stock",
            type: "number",
            defaultValue: 0,
            admin: {
                description: "The total stock of all variants combined.",
                readOnly: true,
            }
        },
    ],
}
