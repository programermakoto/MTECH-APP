import { NextRequest, NextResponse } from "next/server";
import initStripe from "stripe";
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerCliient";

export async function GET(req: NextRequest) {
    const supabase =supabaseRouteHandlerClient();
        // アクセストークンをログ出力
        const accessToken = req.headers.get("Authorization")?.replace("Bearer ", "");
        console.log("Access Token:", accessToken); // ここでアクセストークンを確認
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

    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.billingPortal.sessions.create({
        customer: stripe_customer_data?.stripe_customer!,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
    });
    return NextResponse.json({
        url: session.url
    });
}

