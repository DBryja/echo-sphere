import type { CollectionConfig, CollectionBeforeChangeHook } from "payload";

const populateAuthorsField: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
  originalDoc,
}) => {
  // Only proceed if it's an update/create operation and authors field is empty
  if ((operation === "create" || operation === "update") && !data.authors) {
    const payload = req.payload;
    const artistDocs = await payload.find({
      collection: "artists",
      where: {
        id: {
          in: data.artists,
        },
      },
    });
    data.authors = artistDocs.docs.map((artist) => artist.name).join(" & ");
  }
  return data;
};

export const Releases: CollectionConfig = {
  slug: "releases",
  admin: {
    group: "Main",
  },
  hooks: {
    beforeChange: [populateAuthorsField],
  },
  fields: [
    {
      name: "id",
      label: "ID",
      type: "text",
      required: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Album",
          value: "album",
        },
        {
          label: "EP",
          value: "ep",
        },
        {
          label: "Single",
          value: "single",
        },
      ],
      required: true,
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
      name: "authors",
      type: "text",
      required: false,
      admin: {
        description:
          "The authors of the release: Aaliyah & Ethan & Jack. If empty the authors will be equal to the assigned artists.",
      },
    },
    {
      name: "artists",
      type: "relationship",
      relationTo: "artists",
      hasMany: true,
      required: true,
      admin: {
        description:
          "The artists(from the label) that are part of this release. Used to query documents.",
      },
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
          name: "tidal",
          type: "text",
          defaultValue: "https://tidal.com/",
        },
        {
          name: "youtube",
          type: "text",
          defaultValue: "https://music.youtube.com/",
        },
      ],
    },
  ],
};
