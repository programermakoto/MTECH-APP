import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe"
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerCliient";





export async function GET(
    req: NextRequest,
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
        .eq("id", user?.id)
        .single();
    const priceId = params.priceId;
    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
    const stripeCustomer = stripe_customer_data?.stripe_customer;

    if (!stripeCustomer) {
        // エラーハンドリング: stripe_customer が無効な場合の処理
        return NextResponse.json({ error: "Invalid customer data" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
        customer: stripeCustomer, // 安全に stripeCustomer を使用
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{
            price: priceId, quantity: 1
        }],
        success_url: "process.env.http://localhost:3000/payment/success`",
        cancel_url: "process.env.http://localhost:3000/payment/cancelled",
    });

    return NextResponse.json({
        id: session.id
    });
}