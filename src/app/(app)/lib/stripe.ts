import "server-only";

import Stripe from "stripe";
// TODO: Update url to production url
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16",
    appInfo: {
        name: "Echo-Sphere",
        url: "http://localhost:3000/",
    }
});