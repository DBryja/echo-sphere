import type { Product } from "use-shopping-cart/core";
import type {Product as PayloadProduct} from "@/payload-types";

export function formatAmountForDisplay(
  amount: number,
  currency: string,
): string {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  return numberFormat.format(amount);
}

export function formatAmountForStripe(
  amount: number,
  currency: string,
): number {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency: boolean = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
}

export const formatSize = (size: string) => {
  switch (size.toLowerCase()) {
    case "small":
    case "sm":
    case "s":
      return "Small";
    case "medium":
    case "md":
    case "m":
      return "Medium";
    case "large":
    case "lg":
    case "l":
      return "Large";
    case "extra large":
    case "extra-large":
    case "xlarge":
    case "xl":
      return "Extra Large";
    case "one-size":
    case "one size":
    case "os":
      return "One Size";
    default:
      return null;
  }
};
export type ProductVariant = PayloadProduct["variants"][0];
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
  price: number;
  product_id: string;
} & ProductVariant;

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