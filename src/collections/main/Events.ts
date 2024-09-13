import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
    slug: 'events',
    admin: {
        group: "Main",
    },
    fields: [
        {
            name: "id",
            label: "ID",
            type: "text",
            required: true,
        },
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: "date",
            type: "date",
            required: true,
        },
        {
            name: "img-poster",
            type: "upload",
            relationTo: "media",
            required: true,
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
