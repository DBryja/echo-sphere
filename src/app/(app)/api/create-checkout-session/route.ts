import { NextRequest, NextResponse } from "next/server";
import config from "@payload-config";
import { CartItem, ProductVariant, TemplateItem, validateItem, formatSize } from "@app/utils";
import { getStripe } from "@app/lib/stripe"; //stripe singleton
import {getPayload} from "payload";
import { Product } from "@/payload-types";

const stripe = getStripe();

export async function POST(req: NextRequest) {
    try {
        const { cartDetails } = (await req.json()) as {[key: string]: Product};
        // <<< get product variants from database
      const payload = await getPayload({ config });
      const payloadItems = (await payload.find({
        collection: "products",
        where: {
          "variants.id": {
            in: Object.keys(cartDetails)
          }
          },
        pagination: false,
      })).docs as Array<Product>;
      if (!payloadItems) {
        return NextResponse.json({ statusCode: 400, message: "Invalid cart items" }, { status: 400 });
      }

      // TemplateItem is a product variant extended with product data like price and product_id
      const templateItems: TemplateItem[] = payloadItems.flatMap((item: Product) => {
        return item.variants.map((variant: ProductVariant) => ({
          ...variant,
          price: item.price,
          product_id: item.id,
        }));
      });
      if(!templateItems || templateItems.length === 0) {
        return NextResponse.json({ statusCode: 400, message: "No variants found" }, { status: 400 });
      }
      // get product variants from database >>>

      // <<< Convert cart items to Stripe line items
      // There is no proper type of LineItems in stripe package this is based on its documentation: https://docs.stripe.com/api/checkout/sessions/create
      const lineItems = Object.values(cartDetails).map((item: CartItem) => {
        const templateItem = templateItems.find((variant: ProductVariant) => variant.id === item.id);
        if (!templateItem || !validateItem(item, templateItem)) {
          throw new Error(`Invalid cart item: ${item.id}`);
        }

        return {
          price_data: {
            unit_amount: item.price,
            currency: "usd",
            product_data: {
              name: item.name,
              description: `Size: ${formatSize(item.size)}`,
              // @ts-ignore TS declarations are not complete so it ends on 'object' type
              images: item.price_data?.product_data.images,
            },
          },
          quantity: item.quantity,
        };
      });
      const totalAmount = lineItems.reduce((total, item) => total + item.price_data.unit_amount * item.quantity, 0);
      // Create Checkout Sessions from body params
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `${req.headers.get('origin')}/store/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/store`,
        phone_number_collection: {
          enabled: true,
        },
        billing_address_collection: 'required',
        shipping_address_collection: {
          allowed_countries: ['US'],
        },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: totalAmount > 9999 ? 0 : 500,
                currency: 'usd',
              },
              display_name: 'Standard shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 3,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              },
            },
          },
        ],
        locale: "en",
        expires_at: (Math.floor(Date.now()/1000) + 1800)
      })

    const order = await payload.create({
      collection: "orders",
      data: {
        date: new Date().toISOString(),
        session_id: session.id,
        items: Object.values(cartDetails).map((item) => {
          const cartItem = item as CartItem;
          return {
            product: cartItem.product_data.id,
            sku: cartItem.sku,
            sku_id: cartItem.sku_id,
            quantity: cartItem.quantity,
            price: cartItem.price,
            value: cartItem.value,
            size: cartItem.size,
          };
        }),
        total: totalAmount,
        status: "pending",
      },
    });
      return NextResponse.json({ sessionId: session["id"], orderId: order.id });
    } catch (err) {
      const error = err as Error;
      return NextResponse.json({ statusCode: 500, message: error.message ? error.message : "" }, { status: 500 });
    }
}
