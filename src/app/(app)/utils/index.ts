import type { Product } from "use-shopping-cart/core";
import type { Media } from "@/payload-types";
export type CartItem = {
  size: string;
  quantity: number;
  sku: string;
  sku_id: string;
  product_data: {
    id: string;
  };
} & Product;
export type TemplateItem = {
  id: string;
  stock: number;
  size: string;
  sku: string;
  sku_id: string;
  price_id: string;
  price: number;
  product_id: string;
};

export function formatCurrencyString({
  value,
  currency,
}: {
  value: number;
  currency?: string;
}) {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ? currency : "USD",
  });
  return numberFormat.format(value / 100);
}

export const validateItem = (
  cartItem: CartItem,
  templateItem: TemplateItem | undefined,
) => {
  if (!templateItem) {
    throw new Error(`Invalid cart item: No template item found`);
  }
  if (cartItem.id !== templateItem.id) {
    throw new Error(
      `Invalid cart item: ID mismatch (expected ${templateItem.id}, got ${cartItem.id})`,
    );
  }
  if (cartItem.product_data.id !== templateItem.product_id) {
    throw new Error(
      `Invalid cart item: Product ID mismatch (expected ${templateItem.product_id}, got ${cartItem.product_data.id})`,
    );
  }
  if (cartItem.price !== templateItem.price) {
    throw new Error(
      `Invalid cart item: Price mismatch (expected ${templateItem.price}, got ${cartItem.price})`,
    );
  }
  if (cartItem.size !== templateItem.size) {
    throw new Error(
      `Invalid cart item: Size mismatch (expected ${templateItem.size}, got ${cartItem.size})`,
    );
  }
  if (cartItem.quantity > templateItem.stock || cartItem.quantity < 1) {
    throw new Error(
      `Invalid cart item: Quantity out of range (stock ${templateItem.stock}, got ${cartItem.quantity})`,
    );
  }
  if (cartItem.sku !== templateItem.sku) {
    throw new Error(
      `Invalid cart item: SKU mismatch (expected ${templateItem.sku}, got ${cartItem.sku})`,
    );
  }
  if (cartItem.sku_id !== templateItem.sku_id) {
    throw new Error(
      `Invalid cart item: SKU ID mismatch (expected ${templateItem.sku_id}, got ${cartItem.sku_id})`,
    );
  }
  if (cartItem.currency !== "usd") {
    throw new Error(
      `Invalid cart item: Currency mismatch (expected 'usd', got ${cartItem.currency})`,
    );
  }
  return true;
};

export const getImageUrl = (img: string | Media): string => {
  if (typeof img !== "object") return img;
  if (img.url) return img.url;

  return "";
};
type ItemWithImg = {
  name: string;
  img: string | Media;
  [key: string]: any;
};
export const getAlt = (item: ItemWithImg) => {
  // If the item is a Media object directly, return its alt
  if (item.img) {
    return typeof item.img === "string" ? item.name : item.img.alt;
  }
  return "";
};

export const getImgAlt = (img: Media | string): string => {
  if (typeof img !== "object") return "";

  if ("alt" in img) return img.alt;

  return "";
};

export const sanitizeBreakpointVariable = (variable: string) => {
  return parseInt(variable.replace(/["px\s]/g, ""));
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const amppm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hoursStr}:${minutesStr} ${amppm}`;
};

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];
export const extractDate = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth();
  const monthShorthand = months[month];
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const time = formatTime(dateObj);
  return { time, minutes, hour, day, month, monthShorthand, year };
};

const stateAbbreviations: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  AS: "American Samoa",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  TT: "Trust Territories",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  VI: "Virgin Islands",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};
export function extractAddress(address: string) {
  const parts = address.split(",");

  const stateAndCity = parts.slice(0, 2).map((part) => part.trim());
  const city = stateAndCity[1];
  const stateFullName = stateAndCity[0];
  const stateAbbr = Object.keys(stateAbbreviations).find(
    (abbr) => stateAbbreviations[abbr] === stateFullName,
  );

  return {
    city,
    stateAbbr: stateAbbr || null,
    stateFullName,
    building: parts[2],
    street: parts[3],
  };
}
