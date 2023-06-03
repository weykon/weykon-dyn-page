import { getSupabase } from "@/server.supabse";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'
const NewUser = async () => {

    const supabase = getSupabase();

    const user = (await supabase.auth.getUser()).data.user;

    const { data, error } = await supabase.from('users').select('name').eq('id', user?.id).single()
    console.log(1, data, error)
    if (!error) {
        if (!data.name) {

        } else {
            redirect(`/${data.name}`)
        }
    }

    const handleSubmit = async (e: FormData) => {
        'use server'
        const { name } = Object.fromEntries(e.entries());
        const supabase = getSupabase();
        const user = (await supabase.auth.getUser()).data.user;
        console.log('handleSubmit', user)
        const { data, error } = await supabase.from('users').update({ name: name.toString() }).eq('id', user?.id);
        console.log(2, data, error)
        if (!error) {
            revalidatePath(`/${name}`)
        }
    }

    return (
        <>
            <form action={handleSubmit}>
                <p>输入你的用户名</p>
                <input type="text" className=" border-2 border-blue-300 bg-green-200" name='name' />
                <button type="submit">OK</button>
            </form>
        </>
    )
}

export default NewUser