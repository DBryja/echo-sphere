import type { CollectionConfig } from 'payload'
import {limitToOneRecord} from "@/collectionHooks";

export const ContactData: CollectionConfig = {
    slug: 'contact-data',
    admin: {
        group: "Site-Data",
    },
    access: {
        create: ()=>false,
        delete: ()=>false
    },
    hooks: {
        beforeValidate: [
            limitToOneRecord
        ]
    },
    fields: [
        {
            name: 'email',
            type: 'text',
            required: true,
        },
        {
            name: "phone-number",
            type: "text",
            required: true,
        },
        {
            name: "address",
            type: "text",
            required: true,
        },
        {
            name: 'socials',
            type: 'group',
            fields: [
                {
                    name: "facebook",
                    type: "text",
                    defaultValue: "https://www.facebook.com/",
                },
                {
                    name: "instagram",
                    type: "text",
                    defaultValue: "https://www.instagram.com/",
                },
                {
                    name: "youtube",
                    type: "text",
                    defaultValue: "https://www.youtube.com/",
                },
            ]
        }
    ],
}
