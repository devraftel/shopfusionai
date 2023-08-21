

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

const settingsUrl = process.env.Base_Url!
export async function GET(request: NextRequest) {

    const req = request.nextUrl;
    const title = req.searchParams.get("title") as string;
    console.log('[STRIPE_TITLE]', title);
    const category = req.searchParams.get("category") as string;
    console.log('[STRIPE_category]', category);
    const image = req.searchParams.get("image") as string;
    console.log('[STRIPE_image]', image);
    // const price = (req.searchParams.get('price'))
    // console.log('[STRIPE_price]', price);
    // const priceNumber = parseFloat(price.replace("$", ""));
    // const finalPrice = price ? parseFloat(price) : 0
    const priceString = (req.searchParams.get('price'))
    const priceNumber = priceString ? parseFloat(priceString.replace("$", "")) : 0;
    console.log('[STRIPE_finalPrice]', priceNumber);


    try {

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "payment",
            billing_address_collection: "auto",
            line_items: [
                {
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: title,
                            description: category,
                            images: [image]
                        },
                        unit_amount: priceNumber * 100,
                    },
                    quantity: 1,
                },
            ],
        })

        return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    } catch (error) {
        console.log("[STRIPE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};