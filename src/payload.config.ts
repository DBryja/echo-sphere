// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

import { Artists } from "./collections/main/Artists";
import { Releases } from "./collections/main/Releases";
import { Events } from "./collections/main/Events";

import { Colors } from "@/collections/tags&types/Colors";
import { ProductTags } from "@/collections/tags&types/ProductTags";
import { ProductTypes } from "@/collections/tags&types/ProductTypes";
import { ProductCategories } from "@/collections/tags&types/ProductCategories";
import { Products } from "@/collections/store/Products";
import { ShippingAddresses } from "@/collections/store/ShippingAddresses";
import { Orders } from "@/collections/store/Orders";

import { ContactData } from "@/collections/siteData/ContactData";
import { MenuItems } from "@/collections/siteData/MenuItems";
import { ArtistsArchive } from "@/collections/pages/ArtistsArchive";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: "gravatar",
  },
  collections: [
    //main
    Artists,
    Releases,
    Events,
    //store
    Products,
    Orders,
    ShippingAddresses,
    //tags&types
    ProductTags,
    ProductTypes,
    ProductCategories,
    Colors,
    // utils
    Media,
    Users,
    //pages
    ArtistsArchive,
    //site data
    ContactData,
    MenuItems,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        [Media.slug]: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
});
