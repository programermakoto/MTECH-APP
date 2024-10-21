import AuthClientButton from "./AuthClientButton";
import { supabaseServer } from "@/utils/supabaseServer";

const AuthServerButton = async () => {
    const supabase = supabaseServer();
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
