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
    _req: NextRequest, // _req に変更
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
        .eq("id", user.id) // user?.idをuser.idに変更
        .single();

    if (!stripe_customer_data || !stripe_customer_data.stripe_customer) {
        return NextResponse.json({ error: "Invalid customer data" }, { status: 400 });
    }

    const priceId = params.priceId;
    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);

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
}
