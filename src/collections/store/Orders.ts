import type {CollectionConfig} from 'payload'

export const Orders: CollectionConfig = {
    slug: 'orders',
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
                    label: "Paid",
                    value: "paid",
                },
                {
                    label: "shipped",
                    value: "shipped",
                },
                {
                    label: "Completed",
                    value: "completed",
                },
                {
                    label: "Cancelled",
                    value: "cancelled",
                }
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
                }
            ],
        },
        {
            name: "total",
            type: "number",
        },
        {
            name:"shippingAddress",
            type: "relationship",
            relationTo: "shipping-addresses",
        }
    ],
    admin: {
        useAsTitle: 'date',
        defaultColumns: ['date', 'status'],
        group: 'Store',
    }
}