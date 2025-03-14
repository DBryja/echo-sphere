import {seoPlugin} from "@payloadcms/plugin-seo";
import type {
  GenerateTitle,
  GenerateDescription,
  GenerateURL,
  GenerateImage
} from '@payloadcms/plugin-seo/types';
import type { Artist, Media, Product } from "@/payload-types";
import {getServerSideURL} from "@utils/meta";

const generateTitle: GenerateTitle<Artist | Product> = ({ doc, collectionSlug }) => {
  return doc?.name
    ? `${doc.name} | Echo Sphere`
    :  `${collectionSlug} | Echo Sphere`;
}

const generateDescription: GenerateDescription<Artist | Product> = ({ doc }) => {
  return doc.description;
}

// @ts-ignore
const generateImage: GenerateImage<Artist | Product> = ({ doc, collectionSlug }) => {
  if (collectionSlug === "artists") {
    return (doc as Artist)["img-banner"];
  } else {
    return (doc as Product).images![0]!.img! as (string | Media);
  }
}

const generateURL: GenerateURL<Artist | Product> = ({ doc, collectionSlug }) => {
  const url = getServerSideURL();
  return `${url}/${collectionSlug}/${doc.id}`;
}

const plugins: Plugin[] = [
  seoPlugin({
    collections: ["artists", "products"],
    generateTitle,
    generateDescription,
    generateImage,
    generateURL,
    uploadsCollection: "media",
  }),
]
export default plugins;