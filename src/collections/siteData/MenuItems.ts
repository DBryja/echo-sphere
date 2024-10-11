import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
    slug: 'menu-items',
    admin: {
        group: "Site-Data",
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: "path",
            type: "text",
            required: true,
        },
        {
            name: "img",
            type: "upload",
            relationTo: "media",
            required: true,
        },
    ],
}
