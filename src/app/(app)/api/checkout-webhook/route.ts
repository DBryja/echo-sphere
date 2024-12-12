import { NextResponse } from "next/server";
import { getStripe } from "@app/lib/stripe";
import { headers } from "next/headers";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";

const stripe = getStripe();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: { text: () => any }) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = (err as Error).message;
    console.error(`Webhook Error: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object;
    // Retrieve the Checkout Session to get full details
    const retrievedSession = await stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ["line_items", "shipping_details"],
      },
    );
    // console.log(retrievedSession);

    const payload = await getPayloadHMR({ config });

    // Create ShippingAddress record
    const shippingAddress = await payload.create({
      collection: "shipping-addresses",
      data: {
        name: retrievedSession.shipping_details?.name,
        email: retrievedSession.customer_details?.email,
        phone: retrievedSession.customer_details?.phone,
        customer_details: { ...retrievedSession.shipping_details?.address },
      },
    });

    // // Update order status to 'paid'
    await payload.update({
      collection: "orders",
      where: {
        session_id: {
          equals: session.id,
        },
      },
      data: {
        status: "paid",
        shippingAddress: shippingAddress.id,
      },
    });
  }

  if (
    event.type === "checkout.session.expired" ||
    event.type === "checkout.session.async_payment_failed"
  ) {
    const session = event.data.object;
    const payload = await getPayloadHMR({ config });
    await payload.update({
      collection: "orders",
      where: {
        session_id: { equals: session.id },
      },
      data: {
        status: "cancelled",
      },
    });
  }

  return NextResponse.json({ received: true });
}
