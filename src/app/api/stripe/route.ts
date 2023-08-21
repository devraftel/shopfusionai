
import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = 'http://localhost:3000'

export async function GET(request: NextRequest) {

    const req = request.nextUrl;
    const title = req.searchParams.get("title") as string;
    const description = req.searchParams.get("description") as string;
    const price = (req.searchParams.get('price'))
    const finalPrice = price ? parseFloat(price) : 0



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
                            description: description
                        },
                        unit_amount: finalPrice * 100,
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