import type { CollectionConfig } from 'payload'
import payload from "payload";
import {limitToOneRecord} from "@/collectionHooks";

export const MenuItems: CollectionConfig = {
    slug: 'menu-items',
    admin: {
        group: "Site-Data",
        useAsTitle: 'name',
    },
    fields: [
        {
            type: "row",
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: "order",
                    type: "number",
                    required: true,
                    admin: {
                        description: "The order in which the menu items will appear on the site",
                    }
                },
                {
                    name: "showInNav",
                    type: "checkbox",
                    defaultValue: true,
                    admin:{
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            width: "fit-content",
                            justifyContent: "center",
                            alignItems: "flex-start",
                        }
                    }
                }
            ]
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