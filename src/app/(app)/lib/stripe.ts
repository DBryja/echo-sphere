import "server-only";

import Stripe from "stripe";

let stripeInstance: Stripe | null = null;
export function getStripe() {
    if(!stripeInstance){
       stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
            apiVersion: process.env.STRIPE_API_VERSION,
            appInfo: {
                name: "Echo-Sphere",
                url: process.env.NODE_ENV === "production"
                    ? process.env.LIVE_URL
                    : "http://localhost:3000",
            }
        });
    }
    return stripeInstance;
}