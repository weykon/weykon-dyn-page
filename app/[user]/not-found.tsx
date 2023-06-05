import { getSupabase } from '@/server.supabse';
import { revalidatePath } from 'next/cache';
import FixName from '@/app/auth/FixName';

export default async function NotFound() {
    return <FixName />
}