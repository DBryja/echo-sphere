import type {CollectionConfig} from 'payload'

export const ProductTypes: CollectionConfig = {
    slug: 'product-types',
    fields: [
        {
            name: "name",
            type: "text",
            unique: true,
            required: true,
            admin: {
                description: "T-shirt, Hoodie, Hat, Mug, etc."
            }
        },
        {
            name: "related-categories",
            type: "relationship",
            relationTo: "product-categories",
            hasMany: true,
        }
    ],
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name'],
        group: 'Tags'
    }
}