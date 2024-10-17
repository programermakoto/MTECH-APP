import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from '@supabase/auth-helpers-nextjs'; // auth-helpersからSessionをインポート
import AuthClientButton from "./AuthClientButton";

const AuthServerButton = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data: { session } }: { data: { session: Session | null } } = await supabase.auth.getSession();

    // sessionがnullかどうかをチェック
    if (!session) {
        return <div>Not signed in</div>;
    }

    return (
        <AuthClientButton session={session} />
    );
}

export default AuthServerButton;
