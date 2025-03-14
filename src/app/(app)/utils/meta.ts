import { Artist, Product } from "@/payload-types";
import { getImageUrl } from "@utils/index";
import { Metadata } from "next";

export const getServerSideURL = (): string => {
  // Make sure LIVE_URL is defined and properly formatted
  if (process.env.NODE_ENV === "development" && process.env.LIVE_URL) {
    return process.env.LIVE_URL;
  }

  // Fallback for production or if LIVE_URL is not set
  return process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
}

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'Echo Sphere is a music label ...',
  siteName: 'Echo Sphere',
  title: 'Echo Sphere',
  images: [
    {
      url: '/img/home/hero.png', // Use relative path here
    },
  ],
}

// Set metadataBase separately from the defaultOpenGraph
export const siteConfig = {
  metadataBase: new URL(getServerSideURL())
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

export const generateMeta = async (args: {
  doc: Partial<Artist> | Partial<Product> | null
}): Promise<Metadata> => {
  const {doc} = args;

  const ogImage = getImageUrl(doc?.meta?.image);

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : 'Echo Sphere'

  return {
    metadataBase: siteConfig.metadataBase, // Add this line
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || "",
      images: ogImage
        ? [{url: ogImage}]
        : undefined,
      title,
    }),
    title
  }
}