import '@/app/globals.css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';

export default async function AuthPage({
    children,
}: {
    children: React.ReactNode,
}) {
    const supabase = createServerComponentClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
        return (
            <div className="w-auto flex flex-col items-center">
                {children}
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