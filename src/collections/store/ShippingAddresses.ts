import type {CollectionConfig} from 'payload'

export const ShippingAddresses: CollectionConfig = {
    slug: 'shipping-addresses',
    fields: [
        {
            name: "name",
            type: "text",
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
            name: "customer_details",
            type: "group",
            fields: [
                {
                    name: "line1",
                    type: "text",
                },
                {
                    name: "line2",
                    type: "text",
                },
                {
                    name: "city",
                    type: "text",
                },
                {
                    type: "row",
                    fields: [
                        {
                            name: "state",
                            type: "text"
                        },
                        {
                            name: "postal_code",
                            type: "text"
                        },
                    ]
                }
            ]
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