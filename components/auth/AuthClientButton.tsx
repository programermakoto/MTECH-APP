"use client"

import { Session } from "@supabase/auth-helpers-nextjs"; // 正しいSession型をインポート
import React from "react";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const AuthClientButton = ({ session }: { session: Session | null }) => {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        });
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <>
            {session ? <Button onClick={handleSignOut}>ログアウト</Button> : <Button onClick={handleSignIn}>サインイン</Button>}
        </>
    )
}

export default AuthClientButton;
