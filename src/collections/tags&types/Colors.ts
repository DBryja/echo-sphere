import type {CollectionConfig} from 'payload'

export const Colors: CollectionConfig = {
    slug: 'colors',
    admin: {
        group: "Tags",
        useAsTitle: "name",
        defaultColumns: ["name"],
    },
    fields: [
        {
            name: "name",
            type: "text"
        }
    ],
}