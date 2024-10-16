import type { CollectionConfig } from 'payload'
import {limitToOneRecord} from "@/collectionHooks";
import payload from "payload";

export const ArtistsArchive: CollectionConfig = {
    slug: 'artistsArchive',
    labels: {
        singular: "artistsArchive",
        plural: "artistsArchive"
    },
    admin: {
        group: "Pages",
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
            name: "heading",
            type: "text",
        },
        {
            name: "subheading",
            type: "text"
        },
        {
            name: "desc1",
            type: "textarea"
        },
        {
            name: "desc2",
            type: "textarea"
        },
        {
            name: "desc3",
            type: "textarea"
        }
    ]
}
