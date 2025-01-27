import { cache } from "react";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import config from "@payload-config";
import {
  ArtistsArchive,
  Artist,
  MenuItem,
  ContactDatum,
  Release,
  Event,
  AboutUs,
} from "@/payload-types";
import { PaginatedDocs } from "payload";

const payload = await getPayloadHMR({ config });

export const fetchArtistsData = cache(async () => {
  const data: PaginatedDocs<Artist> = await payload.find({
    collection: "artists",
    pagination: false,
    sort: "order",
  });
  return data;
});

export const fetchNavItems = cache(async (): Promise<MenuItem[]> => {
  const query = await payload.find({
    collection: "menu-items",
    pagination: false,
    sort: "order",
  });
  return query.docs as MenuItem[];
});

export const fetchContactData = cache(async (): Promise<ContactDatum> => {
  const query = await payload.find({
    collection: "contact-data",
    pagination: false,
  });
  return query.docs[0] as ContactDatum;
});

export const fetchArtistById = cache(async (slug: string): Promise<Artist> => {
  return await payload.findByID({
    collection: "artists",
    id: slug,
  });
});

export const fetchReleasesByArtistId = cache(
  async (artistId: string): Promise<Release[]> => {
    const releases = await payload.find({
      collection: "releases",
      where: {
        "artists.id": {
          in: [artistId],
        },
      },
      sort: "-release-date",
      limit: 5,
      pagination: false,
    });
    return releases.docs as Release[];
  },
);

export const fetchEventsByArtistId = cache(
  async (artistId: string): Promise<Event[]> => {
    const events = await payload.find({
      collection: "events",
      where: {
        "related-artists.id": {
          in: [artistId],
        },
      },
      sort: "-date",
      limit: 5,
      pagination: false,
    });
    return events.docs as Event[];
  },
);

export const fetchArtistsArchiveCopy = cache(
  async (): Promise<ArtistsArchive> => {
    return (
      await payload.find({
        collection: "artistsArchive",
        pagination: false,
      })
    ).docs[0];
  },
);

export const fetchAboutUsCopy = cache(async (): Promise<AboutUs> => {
  return (
    await payload.find({
      collection: "aboutUs",
      pagination: false,
    })
  ).docs[0];
});

export const fetchReleases = cache(async (): Promise<Release[]> => {
  return (
    await payload.find({
      collection: "releases",
      pagination: false,
    })
  ).docs;
});

export const fetchEvents = cache(async (): Promise<Event[]> => {
  return (
    await payload.find({
      collection: "events",
      pagination: false,
      sort: "date",
    })
  ).docs;
});
