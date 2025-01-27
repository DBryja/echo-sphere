import type { CollectionConfig } from "payload";
import { limitToOneRecord } from "@/collectionHooks";

export let ArtistsArchive: CollectionConfig;
ArtistsArchive = {
  slug: "artistsArchive",
  labels: {
    singular: "ArtistsArchive",
    plural: "ArtistsArchive",
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
      name: "heading",
      type: "text",
    },
    {
      name: "subheading",
      type: "text",
    },
    {
      name: "desc1",
      type: "textarea",
    },
    {
      name: "desc2",
      type: "textarea",
    },
    {
      name: "desc3",
      type: "textarea",
    },
  ],
};
