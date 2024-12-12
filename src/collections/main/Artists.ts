import type { CollectionConfig } from "payload";

export const Artists: CollectionConfig = {
  slug: "artists",
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
      type: "row",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "order",
          type: "number",
          required: false,
          admin: {
            description:
              "The order in which the artists will appear on the site. The lower the number the biggest priority",
          },
        },
      ],
    },
    {
      name: "genre",
      type: "text",
      required: false,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "extra",
      type: "textarea",
      required: false,
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
      required: true,
    },
    {
      name: "socials",
      type: "group",
      fields: [
        {
          name: "youtube",
          type: "text",
          defaultValue: "https://www.youtube.com/",
        },
        {
          name: "tidal",
          type: "text",
          defaultValue: "https://www.tidal.com/",
        },
        {
          name: "spotify",
          type: "text",
          defaultValue: "https://www.spotify.com/",
        },
      ],
    },
  ],
};
