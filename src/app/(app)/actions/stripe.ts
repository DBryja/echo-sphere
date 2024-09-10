"use server";

import type { Stripe } from "stripe";

import { headers } from "next/headers";

import { CURRENCY } from "../config";
import { formatAmountForStripe } from "../utils/stripe-helpers";
import { stripe } from "../lib/stripe";

//both actions read total payment amount from form data
const getTotal = (data: FormData) => {
    return Number(data.get("total") as string);
}

//TODO: Zamiast form data, będziemy korzystać z koszyka
export async function createCheckoutSession(
    data: FormData,
): Promise<{ client_secret: string | null; url: string | null }> {
    const origin: string = headers().get("origin") as string;

    const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
            mode: "payment",
            submit_type: "pay",
            line_items: [
                //TODO: List all items from cart
                {
                    quantity: 1,
                    price_data: {
                        currency: CURRENCY,
                        product_data: {
                            name: "Custom amount donation",
                        },
                        unit_amount: formatAmountForStripe(
                            getTotal(data),
                            CURRENCY,
                        ),
                    },
                },
            ],
            ui_mode: "hosted",
            success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    };
}

export async function createPaymentIntent(
    data: FormData,
): Promise<{ client_secret: string }> {
    const paymentIntent: Stripe.PaymentIntent =
        await stripe.paymentIntents.create({
            amount: formatAmountForStripe(
                getTotal(data),
                CURRENCY,
            ),
            automatic_payment_methods: { enabled: true },
            currency: CURRENCY,
        });

    return { client_secret: paymentIntent.client_secret as string };
}