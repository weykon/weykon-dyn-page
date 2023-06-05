import { getSupabase } from "@/server.supabse";
import LoginPage from "./login";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function AuthPage() {
    const supabase = getSupabase()
    const { session } = (await supabase.auth.getSession()).data

    if (!session) {
        return (
            <div className="w-8/12 flex flex-col items-center">
                <h1>Hello Page Auth</h1>
                <LoginPage />
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