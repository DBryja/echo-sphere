import {cache} from "react";
import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";
import type {ArtistsArchive, Artist} from "@/payload-types";
import {PaginatedDocs} from "payload";


export const fetchArtistsData = cache(async () => {
    const payload = await getPayloadHMR({ config });
    const data:PaginatedDocs<Artist> = (
        await payload.find({
            collection: "artists",
            pagination: false,
            sort: "order"
        })
    );
    return data;
});