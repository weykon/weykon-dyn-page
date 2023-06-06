import { getSupabase } from "@/server.supabse";
import AuthPage from "./Auth";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function AuthPageServer() {
    const supabase = getSupabase()
    const { session } = (await supabase.auth.getSession()).data

    if (!session) {
        return (
            <div className="w-auto flex flex-col items-center">
                <AuthPage />
            </div>
        );
    }

    const { data, error } = await supabase.from('users').select('*').eq('id', session?.user?.id).single();

    if (error) {
        notFound()
    } else {
        redirect(`/${data.name}`)
    }

}