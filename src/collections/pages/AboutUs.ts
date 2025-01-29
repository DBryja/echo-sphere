import type { CollectionConfig } from "payload";
import { limitToOneRecord } from "@/collectionHooks";

export let AboutUs: CollectionConfig;
AboutUs = {
  slug: "aboutUs",
  labels: {
    singular: "AboutUs",
    plural: "AboutUs",
  },
  admin: {
    group: "Pages",
  },
  access: {
    create: () => false,
    delete: () => false,
  },
  hooks: {
    beforeValidate: [limitToOneRecord],
  },
  fields: [
    {
      name: "banner_copy",
      type: "text",
    },
    {
      name: "heading",
      type: "text",
    },
    {
      type: "group",
      name: "origins",
      fields: [
        {
          name: "origins_heading",
          type: "text",
        },
        {
          name: "origins_subheading",
          type: "text",
        },
        {
          name: "origins_desc",
          type: "textarea",
        },
        {
          name: "origins_images",
          type: "array",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
          ],
        },
      ],
    },
    {
      type: "group",
      name: "values",
      fields: [
        {
          name: "values_heading",
          type: "text",
        },
        {
          name: "values_desc1",
          type: "text",
        },
        {
          name: "values_desc2",
          type: "text",
        },
      ],
    },
    {
      type: "group",
      name: "about",
      fields: [
        {
          type: "text",
          name: "about_desc1",
        },
        {
          type: "text",
          name: "about_desc2",
        },
      ],
    },
    {
      type: "group",
      name: "summary",
      fields: [
        {
          name: "summary_desc1",
          type: "text",
        },
        {
          name: "summary_desc2",
          type: "text",
        },
        {
          name: "summary_desc3",
          type: "text",
        },
      ],
    },
  ],
};
