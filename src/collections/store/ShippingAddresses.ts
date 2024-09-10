import type {CollectionConfig} from 'payload'

export const ShippingAddresses: CollectionConfig = {
    slug: 'shipping-addresses',
    fields: [
        {
            type: "row",
            fields: [
                {
                    name: "first-name",
                    type: "text"
                },
                {
                    name: "last-name",
                    type: "text"
                },
            ]
        },
        {
            type: "row",
            fields: [
                {
                    name: "email",
                    type: "email"
                },
                {
                    name: "phone",
                    type: "text"
                },
            ]
        },
        {
            name: "address",
            type: "group",
            fields: [
                {
                    name: "address",
                    type: "text",
                },
                {
                    type: "row",
                    fields: [
                        {
                            name: "city",
                            type: "text"
                        },
                        {
                            name: "state",
                            type: "text"
                        },
                        {
                            name: "zip",
                            type: "text"
                        },
                        {
                            name: "country",
                            type: "text"
                        },
                    ]
                }
            ]
        },
        {
            name: "notes",
            type: "textarea"
        },
        {
            name: "payment-status",
            type: "select",
            options: [
                {
                    label: "Unpaid",
                    value: "unpaid",
                },
                {
                    label: "Paid",
                    value: "paid",
                },
                {
                    label: "Refunded",
                    value: "refunded",
                }
            ]
        },
        {
            name: "shipping-status",
            type: "select",
            options: [
                {
                    label: "Pending",
                    value: "pending",
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
                    label: "Returned",
                    value: "returned",
                }
            ]
        },
        {
            name: "stripe",
            type: "group",
            fields: [
                {
                    name: "payment-id",
                    type: "text"
                },
                {
                    name: "customer-id",
                    type: "text"
                },
                {
                    name: "payment-method",
                    type: "text"
                },
            ]
        }
    ],
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['date', 'status'],
        group: 'Store',
        readOnly: true
    }
}