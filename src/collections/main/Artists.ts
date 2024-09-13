import type { CollectionConfig } from 'payload'

export const Artists: CollectionConfig = {
    slug: 'artists',
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
            name: "teaser",
            type: "textarea",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
            required: true,
        },
        {
            name: "img-profile",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "img-banner",
            type: "upload",
            relationTo: "media",
            required: false,
        },
        {
            name: 'socials',
            type: 'group',
            fields: [
                {
                    name: "youtube",
                    type: "text",
                    defaultValue: "https://www.youtube.com/",
                },
                {
                    name: "instagram",
                    type: "text",
                    defaultValue: "https://www.instagram.com/",
                },
                {
                    name: "spotify",
                    type: "text",
                    defaultValue: "https://www.spotify.com/",
                }
            ]
        }
    ],
}
