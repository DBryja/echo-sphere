import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { cartDetails } = await req.json();

        // Convert cart items to Stripe line items
        const lineItems = Object.values(cartDetails).map((item) => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        }));

        // Create Checkout Sessions from body params
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/store/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/store`,
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err) {
        return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 });
    }
}