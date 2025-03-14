import { NextResponse } from "next/server";
import {getPayload} from "payload";
import config from "@payload-config";
import { CartItem, TemplateItem, validateItem } from "@app/utils";
import { getStripe } from "@app/lib/stripe"; //stripe singleton

const stripe = getStripe();
const formatSize = (size: string) => {
  switch (size) {
    case "sm":
      return "Small";
    case "md":
      return "Medium";
    case "lg":
      return "Large";
    case "xl":
      return "Extra Large";
    case "one-size":
    case "os":
      return "One Size";
    default:
      return null;
  }
};

export async function POST(req: {
  json: () => PromiseLike<{ cartDetails: any }> | { cartDetails: any };
  headers: { get: (arg0: string) => any };
}) {
  try {
    const { cartDetails } = await req.json();
    // <<< get product variants from database
    const payload = await getPayload({ config });
    const payloadItems = await payload.find({
      collection: "products",
      where: {
        "variants.id": { in: Object.keys(cartDetails) },
      },
      pagination: false,
    });
    const variants = payloadItems.docs.flatMap((item) =>
      item.variants.map((variant) => ({
        ...variant,
        price: item.price,
        product_id: item.id,
      })),
    );
    // get product variants from database >>>
    // <<< Convert cart items to Stripe line items
    const lineItems = Object.values(cartDetails).map((item) => {
      const cartItem = item as CartItem;
      const templateItem = variants.find(
        (variant) => variant.id === cartItem.id,
      ) as TemplateItem | undefined;
      if (!validateItem(cartItem, templateItem)) {
        throw new Error("Invalid cart item");
      }

      return {
        price_data: {
          unit_amount: cartItem.price,
          currency: "usd",
          product_data: {
            name: cartItem.name,
            description: `Size: ${formatSize(cartItem.size)}`,
            // images: item.price_data.product_data.images,
            // TODO: Change this after uploading on vercel
            images: [`https://picsum.photos/seed/${cartItem.id}/100/100`],
          },
        },
        quantity: cartItem.quantity,
      };
    });
    const totalAmount = lineItems.reduce(
      (total, item) => total + item.price_data.unit_amount * item.quantity,
      0,
    );

    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/store/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/store`,
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: totalAmount > 9999 ? 0 : 500,
              currency: "usd",
            },
            display_name: "Standard shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 3,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
      ],
      locale: "en",
      expires_at: Math.floor(Date.now() / 1000) + 1800,
    });

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

    // setTimeout(async () => {
    //     await stripe.checkout.sessions.expire(session.id);
    // }, 15*1000);

    return NextResponse.json({ sessionId: session.id, orderId: order.id });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json(
      { statusCode: 500, message: error.message },
      { status: 500 },
    );
  }
}
