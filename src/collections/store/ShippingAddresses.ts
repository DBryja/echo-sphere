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
                    type: "row",
                    fields: [
                        {
                            name: "city",
                            type: "text",
                        },
                        {
                            name: "country",
                            type: "text"
                        }
                    ]
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
    ],
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['email','name', 'phone'],
        group: 'Store',
        readOnly: true
    }
}