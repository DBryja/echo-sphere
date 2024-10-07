import type {Product} from "use-shopping-cart/core"
export type CartItem = {
  size: string;
    quantity: number;
    sku: string;
    sku_id: string;
    product_data: {
      id:string;
    }
} & Product
export type TemplateItem = {
  id: string;
  stock: number;
  size: string;
  sku: string;
  sku_id: string;
  price_id: string;
  price: number;
  product_id: string;
}

export function formatCurrencyString({ value, currency }:{value: number, currency?:string}) {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency? currency : 'USD',
  });
  return numberFormat.format(value/100);
}

export const validateItem = (cartItem:CartItem, templateItem:TemplateItem) => {
  if (cartItem.id !== templateItem.id) {
    throw new Error(`Invalid cart item: ID mismatch (expected ${templateItem.id}, got ${cartItem.id})`);
  }
  if (cartItem.product_data.id !== templateItem.product_id) {
    throw new Error(`Invalid cart item: Product ID mismatch (expected ${templateItem.product_id}, got ${cartItem.product_data.id})`);
  }
  if (cartItem.price !== templateItem.price) {
    throw new Error(`Invalid cart item: Price mismatch (expected ${templateItem.price}, got ${cartItem.price})`);
  }
  if (cartItem.size !== templateItem.size) {
    throw new Error(`Invalid cart item: Size mismatch (expected ${templateItem.size}, got ${cartItem.size})`);
  }
  if (cartItem.quantity > templateItem.stock || cartItem.quantity < 1) {
    throw new Error(`Invalid cart item: Quantity out of range (stock ${templateItem.stock}, got ${cartItem.quantity})`);
  }
  if (cartItem.sku !== templateItem.sku) {
    throw new Error(`Invalid cart item: SKU mismatch (expected ${templateItem.sku}, got ${cartItem.sku})`);
  }
  if (cartItem.sku_id !== templateItem.sku_id) {
    throw new Error(`Invalid cart item: SKU ID mismatch (expected ${templateItem.sku_id}, got ${cartItem.sku_id})`);
  }
  if (cartItem.currency !== 'usd') {
    throw new Error(`Invalid cart item: Currency mismatch (expected 'usd', got ${cartItem.currency})`);
  }
  return true;
}