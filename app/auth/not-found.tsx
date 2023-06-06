import { getSupabase } from '@/server.supabse';
import { revalidatePath } from 'next/cache';
import { FixName } from './Auth';

export default async function NotFound() {
    const supabase = getSupabase();
    const { session } = (await supabase.auth.getSession()).data;
    if (!session) {
        revalidatePath('/auth')
    } else {
        const { data, error } = await supabase.from('users').select('*').eq('id', session?.user?.id).single();
        if (error) {
            const { data, error } = await supabase.from('users').insert({ id: session?.user?.id, name: null });
        }
    }

    return <FixName />
}