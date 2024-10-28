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
        <div className="w-full max-w-3xl mx-auto py-16 px-8">
            <h1 className="text-3xl mb-6">MTech管理ダッシュボード</h1>
            <div>
                <div className="mb-5">
                    {profile?.is_subscribed
                        ? `プラン契約中です。: ${profile.interval} プラン`
                        : "プラン未加入です。"}
                </div>
                <p className="text-center p-3 bg-white rounded-lg mb-6 shadow-lg">
                    公式ラインお問い合わせは<a href="https://line.me/R/ti/p/@527qtybu?oat_content=url&ts=08060343" className="text-red-500">こちら</a>から
                    <SubscriptionManagementButton />
                </p>
                
            </div>


        </div>
    );
};
export default Dashboard;