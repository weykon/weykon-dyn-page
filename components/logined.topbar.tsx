import { getSupabase } from "@/server.supabse"

export default function LoginedTopbar() {
    const handleSubmit = async () => {
        'use server'
        const supabase = getSupabase()
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