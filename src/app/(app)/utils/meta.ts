import { Artist, Product } from "@/payload-types";
import { getImageUrl } from "@utils/index";
import { Metadata } from "next";
import ogImage from "../../../../public/OgImage.png";

export const getServerSideURL = (): string => {
  // Make sure LIVE_URL is defined and properly formatted
  if (process.env.NODE_ENV === "development" && process.env.LIVE_URL) {
    return process.env.LIVE_URL;
  }

  // Fallback for production or if LIVE_URL is not set
  return process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
}

const defaultOpenGraph: Metadata['openGraph'] = {
    title: "Echo Sphere - Music Revolutionaries",
    description: "We are a music label from Chicago, founded by former musicians who shared a vision to make music industry open to every creative soul.",
    url: "https://www.echo-sphere-next.vercel.app",
    siteName: "Echo Sphere",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "Echo Sphere - Music Revolutionaries"
      }
    ],
    locale: "en_US",
    type: "website"
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

  const ogImage = getImageUrl(doc?.meta?.image!);

  const title = doc?.meta?.title
    ? doc?.meta?.title
    : 'Echo Sphere'

  return {
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