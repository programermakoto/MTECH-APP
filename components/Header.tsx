import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import AuthServerButton from "./auth/AuthServerButton";
import { supabaseServer } from "@/utils/supabaseServer";

const Header = async () => {
    const supabase = supabaseServer();
    const { data: user } = await supabase.auth.getSession();

    return (
        <div className="flex flex-wrap sm:flex-nowrap py-4 px-6 border-b border-gray-200">
            <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0">ホーム</Button>
            </Link>
            {user.session && (
                <Link href="/dashboard" className="sm:ml-4">
                    <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0">ダッシュボード</Button>
                </Link>
            )}
            <Link href="/pricing" className="sm:ml-4">
                <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0">コース一覧</Button>
            </Link>
            <Link href="https://mtech-it.com" className="sm:ml-4">
                <Button variant="outline" className="w-full sm:w-auto mb-2 sm:mb-0">Mtechコミュニティー</Button>
            </Link>
            <div className="ml-auto">
                <AuthServerButton />
            </div>
        </div>
    );
};

export default Header;
