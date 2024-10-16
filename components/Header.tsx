import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import AuthServerButton from "./auth/AuthServerButton";
import { createServer } from "http";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { supabaseServer } from "@/utils/supabaseServer";

const Header = async () => {
const supabase =supabaseServer();
const {data: user }= await supabase.auth.getSession();

    return (
        <div className="flex py-4 px-6 border-b border-gray-200">
            <Link href="/">
                <Button variant="outline">ホーム</Button>
            </Link>
            {user.session && (
                <Link href="/dashboard" className="ml-4">
                <Button variant="outline">ダッシュボード</Button>
            </Link>
            )}
            <Link href="/pricing" className="ml-4">
                <Button variant="outline">価格</Button>
            </Link>
            <Link href="https://line.me/R/ti/p/@527qtybu?oat_content=url&ts=08060343" className="ml-4">
                <Button variant="outline">問い合わせ</Button>
            </Link>
            <div className="ml-auto">
                <AuthServerButton />
            </div>
        </div>
    );
};
export default Header;