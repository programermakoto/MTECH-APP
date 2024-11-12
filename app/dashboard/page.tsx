import { Database } from "@/lib/database.types";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import SubscriptionManagementButton from "@/components/checkout/SubscriptionManagementButton";
import { supabaseServer } from "@/utils/supabaseServer";

const getProfileData = async (supabase: SupabaseClient<Database>) => {
    const { data: profile } = await supabase
        .from("profile")
        .select("*")
        .single();
    return profile;

};


const Dashboard = async () => {
    const supabase = supabaseServer();
    const profile = await getProfileData(supabase);
    return (
        <div className="w-full max-w-3xl mx-auto py-16 px-8 text-center">
            <h1 className=" text-center text-3xl mb-6">MTech管理ダッシュボード</h1>
            <div>
                <div className="mb-6 text-center">
                    {profile?.is_subscribed
                        ? `プラン契約中です。: ${profile.interval} プラン`
                        : "プラン未加入です。"}

                    <SubscriptionManagementButton />
                </div>
                <p className="text-center p-4 bg-white mt-6 rounded-lg shadow-md space-y-3">
                    <span className="text-gray-700">
                        ITスクールの会員の方は
                        <a href="https://mtech-it.com/blog/secret/index.html" className="text-red-500 hover:underline ml-1">
                            こちら
                        </a>
                        から
                    </span>
                    <span className="text-gray-700">
                        公式ラインお問い合わせは
                        <a href="https://line.me/R/ti/p/@527qtybu?oat_content=url&ts=08060343" className="text-red-500 hover:underline ml-1">
                            こちら
                        </a>
                        から
                    </span>
                </p>
            </div>


        </div>
    );
};
export default Dashboard;