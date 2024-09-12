import type { CollectionConfig } from 'payload'

export const Releases: CollectionConfig = {
    slug: 'releases',
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
            required: true
        },
        {
            name: "type",
            type: "select",
            options: [
                {
                    label: "Album",
                    value: "album"
                },
                {
                    label: "EP",
                    value: "ep"
                },
                {
                    label: "Single",
                    value: "single"
                },
            ],
            required: true
        },
        {
            name: "img-cover",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "release-date",
            type: "date",
            required: true,
        },
        {
            name: "artists",
            type: "relationship",
            relationTo: "artists",
            hasMany: true,
            required: true,
        },
        {
            name: "links",
            type: "group",
            fields: [
                {
                    name: "spotify",
                    type: "text",
                    defaultValue: "https://www.spotify.com/",
                },
                {
                    name: "apple-music",
                    type: "text",
                    defaultValue: "https://music.apple.com/",
                },
                {
                    name: "youtube",
                    type: "text",
                    defaultValue: "https://music.youtube.com/",
                },
            ],
        },
    ],
}
