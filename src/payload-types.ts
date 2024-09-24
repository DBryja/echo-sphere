/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    artists: Artist;
    releases: Release;
    events: Event;
    products: Product;
    orders: Order;
    'shipping-addresses': ShippingAddress;
    'product-tags': ProductTag;
    'product-types': ProductType;
    'product-categories': ProductCategory;
    colors: Color;
    media: Media;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  db: {
    defaultIDType: string;
  };
  globals: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "artists".
 */
export interface Artist {
  id: string;
  name: string;
  teaser: string;
  description: string;
  'img-profile': string | Media;
  'img-banner'?: (string | null) | Media;
  socials?: {
    youtube?: string | null;
    instagram?: string | null;
    spotify?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "releases".
 */
export interface Release {
  id: string;
  name: string;
  type: 'album' | 'ep' | 'single';
  'img-cover': string | Media;
  'release-date': string;
  artists: (string | Artist)[];
  links?: {
    spotify?: string | null;
    'apple-music'?: string | null;
    youtube?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "events".
 */
export interface Event {
  id: string;
  name: string;
  date: string;
  'img-poster': string | Media;
  'related-artists'?: (string | Artist)[] | null;
  links?: {
    website?: string | null;
    tickets?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "products".
 */
export interface Product {
  id: string;
  name: string;
  published?: boolean | null;
  categories: (string | ProductCategory)[];
  type: string | ProductType;
  description: string;
  unique_name: string;
  price: number;
  images: {
    img?: (string | null) | Media;
    id?: string | null;
  }[];
  variants: {
    stock: number;
    size: 'sm' | 'md' | 'lg' | 'xl' | 'one-size';
    sku: string;
    sku_id: string;
    price_id: string;
    id?: string | null;
  }[];
  relatedProducts?:
    | {
        relationType: 'colorway' | 'recommended';
        item?: (string | null) | Product;
        colorHEX?: string | null;
        id?: string | null;
      }[]
    | null;
  tags?: (string | ProductTag)[] | null;
  stock?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product-categories".
 */
export interface ProductCategory {
  id: string;
  name: string;
  description?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product-types".
 */
export interface ProductType {
  id: string;
  name: string;
  'related-categories'?: (string | ProductCategory)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "product-tags".
 */
export interface ProductTag {
  id: string;
  name: string;
  importance?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "orders".
 */
export interface Order {
  id: string;
  date?: string | null;
  status?: ('pending' | 'cancelled' | 'paid' | 'shipped' | 'delivered' | 'return-requested' | 'returned') | null;
  items: {
    product: string | Product;
    sku: string;
    quantity: number;
    price: number;
    value: number;
    size?: string | null;
    id?: string | null;
  }[];
  total?: number | null;
  session_id?: string | null;
  shippingAddress?: (string | null) | ShippingAddress;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "shipping-addresses".
 */
export interface ShippingAddress {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  customer_details?: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    country?: string | null;
    state?: string | null;
    postal_code?: string | null;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "colors".
 */
export interface Color {
  id: string;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}