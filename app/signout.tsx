'use client'
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function SignOut() {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()
    return (
        <button onClick={async () => {
            await supabase.auth.signOut()
            router.replace('/')
        }}>
            Sign Out
        </button>
    );
}