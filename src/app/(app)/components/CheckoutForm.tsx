"use client";

import type Stripe from "stripe"

import React, { useState } from "react"

import {formatAmountForDisplay} from "@/app/(app)/utils/stripe-helpers";
import * as config from "@/app/(app)/config";
import {createCheckoutSession} from "@/app/(app)/actions/stripe";
import getStripe from "@/app/(app)/utils/get-stripejs";
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {}

export default function CheckoutForm(props: CheckoutFormProps): JSX.Element{
    const [loading, setLoading] = useState(false);
    //TODO: Add state handling for form data
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    const formAction = async (data: FormData): Promise<void> => {
        const {client_secret, url} = await createCheckoutSession(data);
        window.location.assign(url as string);
    }


    return (
        <>
            <form action={formAction}>
                <input type={"number"} name={"total"} />
                <button type={"submit"}>Pay</button>
            </form>
        </>
    )
}