import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import initStripe, { Stripe } from "stripe";
import { Database } from "@/lib/database.types";
import SubscriptionButton from "@/components/checkout/SubscriptionButton";
import Link from "next/link";
import { supabaseServer } from "@/utils/supabaseServer";
import AuthServerButton from "@/components/auth/AuthServerButton";


interface Plan {
    id: string;
    name: string;
    price: string | null;
    interval: Stripe.Price.Recurring.Interval | null;
    currency: string;

}

const getAllPlans = async (): Promise<Plan[]> => {

    const stripe = new initStripe(process.env.STRIPE_SECRET_KEY!);
    const { data: plansList } = await stripe.plans.list();

    const plans = await Promise.all(plansList.map(async (plan) => {
        const product = await stripe.products.retrieve(plan.product as string);
        // console.log(product)
        return {
            id: plan.id,
            name: product.name,
            price: plan.amount_decimal,
            interval: plan.interval,
            currency: plan.currency,
        };
    })
    );
    const sortedPlans = plans.sort((a, b) => parseInt(a.price!) - parseInt(b.price!));
    return sortedPlans;
}


const getProfileData = async (supabase: SupabaseClient<Database>) => {
    const { data: profile } = await supabase
        .from("profile")
        .select("*")
        .single();
    return profile;

};


const PricingPage = async () => {
    const supabase = supabaseServer();
    const { data: user } = await supabase.auth.getSession();

    const [plans, profile] = await Promise.all([
        await getAllPlans(),
        await getProfileData(supabase),
    ]);


    const showSubscribeButton = !!user.session && !profile?.is_subscribed;
    const showCreateAccountButton = !user.session;
    const showManageSubscriptionButton = !!user.session && profile?.is_subscribed;
    return (





        <div className="w-full max-w-3xl mx-auto py-16 flex flex-col sm:flex-row flex-wrap gap-4">
            {plans.map((plan) => (
                <Card className="
            shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 bg-white rounded-lg text-center p-6 w-full sm:w-1/2 md:w-1/3"
                    key={plan.id}>
                    <CardHeader>
                        <CardTitle>{plan.name}プラン 会員</CardTitle>
                        <CardDescription>{plan.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {plan.price}円 / {plan.interval}<br />
                        <h3 className="text-lg font-semibold mt-4">Mtech会員限定サービス</h3>
                        <div className="text-gray-700 text-sm leading-relaxed mt-2">
                            <ul className="list-disc text-left">
                                <li>完全紹介制オフラインコミュニティー</li>
                                <li>フリーランス案件紹介</li>
                                <li>転職サポート</li>
                                <li>フリーランス案件紹介</li>
                                <li>チーム開発サポート</li>
                                <li>公式ラインでの質問サポート</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center items-center space-x-4 w-full">
                        {showSubscribeButton && <SubscriptionButton planId={plan.id} />}
                        {showCreateAccountButton && <AuthServerButton />}
                        {showManageSubscriptionButton && (
                            <Button>
                                <Link href="/dashboard">
                                    サブスクリプション管理
                                </Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>





    );
};


export default PricingPage;