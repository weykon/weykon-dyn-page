import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function LoginedTopbar() {
    const handleSubmit = async () => {
        'use server'
        const supabase = createServerActionClient({ cookies })
        const { error } = await supabase.auth.signOut();
        console.log('sign out error ? ', error)
    }
    return (
        <div>
            <p>LoginedTopbar</p>
            <form action={handleSubmit}>
                <button type={'submit'}>
                    Sign Out
                </button>
            </form>
        </div>
    )
}