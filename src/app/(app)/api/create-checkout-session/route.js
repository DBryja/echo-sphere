import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import {validateCartItems} from "use-shopping-cart/utilities";
import {getPayloadHMR} from "@payloadcms/next/utilities";
import config from "@payload-config";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const formatSize = (size) => {
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
}

export async function POST(req) {
    try {
        const { cartDetails } = await req.json();
        // console.log(cartDetails);
        //TODO: Validate if the cartDetails are correct

        // <<< get product variants from database
        const payload = await getPayloadHMR({config});
        const payloadItems = await payload.find({
            collection: "products",
            where: {
                variants: {
                    id: {
                        in: Object.keys(cartDetails)
                    }
                }
            },
            pagination: false,
        });
        const variants = payloadItems.docs.flatMap((item) =>
            item.variants.map((variant) => ({
                ...variant,
                price: item.price,
                product_id: item.id,
            }))
        );
        // get product variants from database >>>
        //TODO: Move to utils
        const validateItem = (cartItem, templateItem) => {
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

// Convert cart items to Stripe line items
        const lineItems = Object.values(cartDetails).map((item) => {
            const templateItem = variants.find((variant) => variant.id === item.id);
            if (!validateItem(item, templateItem)) {
                throw new Error("Invalid cart item");
            }

            return {
            price_data: {
                unit_amount: item.price,
                currency: "usd",
                product_data: {
                    name: item.name,
                    description: `Size: ${formatSize(item.size)}`,
                    // images: item.price_data.product_data.images,
                    // TODO: Change this after uploading on vercel
                    images: [`https://picsum.photos/seed/${item.id}/100/100`]
                },
            },
            quantity: item.quantity,
        }});
        const totalAmount = lineItems.reduce((total, item) => total + item.price_data.unit_amount * item.quantity, 0);
        //TODO: Here i can validate the lineItems to make sure they are correct

        // --- validate line items ---

        // --- create order in database ---

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
            locale: "en"
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 });
    }
}