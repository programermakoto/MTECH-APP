import { NextResponse } from "next/server";
import initStripe from "stripe";
import { supabaseRouteHandlerClient } from "@/utils/supabaseRouteHandlerCliient";

export async function GET() {
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

    if (!stripe_customer_data?.stripe_customer) {
        return NextResponse.json("No Stripe customer found", { status: 400 });
    }

    try {
        const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
        const session = await stripe.billingPortal.sessions.create({
            customer: stripe_customer_data.stripe_customer,
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        });
        return NextResponse.json({ url: session.url });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Stripe error:", error);
            return NextResponse.json(`Error: ${error.message}`, { status: 500 });
        } else {
            console.error("Unknown error:", error);
            return NextResponse.json("Unknown error", { status: 500 });
        }
    }

}
