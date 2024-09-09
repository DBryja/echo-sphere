// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {Artists} from "./collections/main/Artists";
import {Releases} from "./collections/main/Releases";
import {ProductTags} from "@/collections/tags&types/ProductTags";
import {ProductTypes} from "@/collections/tags&types/ProductTypes";
import {ProductCategories} from "@/collections/tags&types/ProductCategories";
import {Products} from "@/collections/store/Products"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    avatar: "gravatar"
  },
  collections: [Users, Media, Artists, Releases, Products, ProductTags, ProductTypes, ProductCategories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
