'use client'
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function SignOut() {
    const supabase = useSupabaseClient()
    return (
        <button onClick={async () => {
            supabase.auth.signOut()
        }}>
            Sign Out
        </button>
    );
}