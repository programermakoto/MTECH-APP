import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerCliient";

// export async function GET(req: NextRequest) {
//     const supabase =supabaseRouteHandlerClient();
//     const { data } = await supabase.auth.getUser();
//     const user = data.user;

//     if (!user) {
//         return NextResponse.json("Unauthorized", { status: 401 });
//     }

//     const { data: stripe_customer_data } = await supabase
//         .from("profile")
//         .select("stripe_customer")
//         .eq("id", user?.id)
//         .single();

//     const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
//     const session = await stripe.billingPortal.sessions.create({
//         customer: stripe_customer_data?.stripe_customer!,
//         return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
//     });
//     return NextResponse.json({
//         url: session.url
//     });
// }


export async function GET(
    _req: NextRequest,
    { params }: { params: { priceId: string } }
) {
    const supabase = supabaseRouteHandlerClient();
    const { data } = await supabase.auth.getUser();
    const user = data.user;

    if (!user) {
        return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { data: stripe_customer_data } = await supabase
        .from("profile")
        .select("stripe_customer")
        .eq("id", user.id)
        .single();

    if (!stripe_customer_data || !stripe_customer_data.stripe_customer) {
        return NextResponse.json({ error: "Invalid customer data" }, { status: 400 });
    }

    const priceId = params.priceId; // priceIdを取得
    console.log("Price ID:", priceId); // ここでpriceIdをログ出力

    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

    try {
        const session = await stripe.checkout.sessions.create({
            customer: stripe_customer_data.stripe_customer,
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{
                price: priceId,
                quantity: 1
            }],
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancelled`,
        });

        return NextResponse.json({
            id: session.id
        });
    }catch (error) {
        console.error("Error creating Stripe session:", error);
        // ここで詳細なエラーメッセージを表示する
        console.error("Error details:", JSON.stringify(error, null, 2));
        return NextResponse.json({ error: (error instanceof Error ? error.message : "Failed to create session!!!!!!") }, { status: 500 });
    }
    
}
