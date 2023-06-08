'use client'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function SignOut() {
    const supabase = useSupabaseClient()
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