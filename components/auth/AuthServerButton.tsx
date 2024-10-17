import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Session } from '@supabase/auth-helpers-nextjs'; // auth-helpersからSessionをインポート
import AuthClientButton from "./AuthClientButton";

const AuthServerButton = async () => {
    const supabase = createServerComponentClient({ cookies });
    // const { data: { session } }: { data: { session: Session | null } } = await supabase.auth.getSession();
    const { data: user } = await supabase.auth.getSession();
    // if (!session) {
    //     return <div>Not signed in</div>;
    // }
    const session = user.session;
    
    return (
        <AuthClientButton session={session} />
    );
}

export default AuthServerButton;
