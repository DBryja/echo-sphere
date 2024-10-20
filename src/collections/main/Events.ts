import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
    slug: 'events',
    admin: {
        group: "Main",
        defaultColumns: ["heading", "type", "date"],
    },
    fields: [
        {
            name: 'type',
            type: 'select',
            required: true,
            options: [
                { label: 'Concert', value: 'concert' },
                { label: 'Festival', value: 'festival' },
                { label: 'Tour', value: 'tour' },
            ],
        },
        {
            type: "row",
            fields: [
                {
                    name: 'heading',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'subheading',
                    type: 'text',
                    required: true,
                    admin: {
                        condition: (data, siblingData) => {
                            return siblingData.type === 'festival' || siblingData.type === 'tour'
                        }
                    }
                },
            ]
        },
        {
          type: "row",
          fields: [
            {
                name: "date",
                type: "date",
                required: true,
                admin: {
                    date: {
                        pickerAppearance: "dayAndTime",
                    },
                }
            },
          ]
        },
        {
            name: "address",
            type: "text",
            required: true,
            admin: {
                condition: (data, siblingData) => {
                    return siblingData.type === 'concert'
                }
            }
        },
        {
            name: "img-poster",
            type: "upload",
            relationTo: "media",
            required: true,
            admin: {
                condition: (data, siblingData) => {
                    return siblingData.type === 'festival' || siblingData.type === 'tour'
                }
            }
        },
        {
            name: "related-artists",
            type: "relationship",
            relationTo: "artists",
            hasMany: true,
        },
        {
            name: 'links',
            type: 'group',
            fields: [
                {
                    name: "website",
                    type: "text",
                    defaultValue: "",
                },
                {
                    name: "tickets",
                    type: "text",
                    defaultValue: "",
                },
            ]
        }
    ],
}