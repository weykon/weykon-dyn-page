import AuthPage from "./Auth";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function AuthPageServer() {
    const supabase = createServerComponentClient({cookies})
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