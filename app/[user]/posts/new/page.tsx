import { getSupabase } from "@/server.supabse";
import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation'
const NewPost = async () => {

    const handleSubmit = async (e: FormData) => {
        'use server'
        const { name } = Object.fromEntries(e.entries());
        const supabase = getSupabase();
        const user = (await supabase.auth.getUser()).data.user;
        const { data, error } = await supabase.from('posts').insert({
            title: name.toString(),
            owner: user?.id,
            content: 'this is the new post here!'
        }).single();

        if (!error) {
            const {data,error}=await supabase.from('posts').select('id').order('created_at', { ascending: false }).eq('owner', user?.id).single();
            if(!error){
                redirect(`${user?.id}/posts/${data?.id}`)
            }
        }
    }

    return (
        <>
            <form action={handleSubmit}>
                <p>type in the Post name: </p>
                <input type="text" className=" border-2 border-blue-300 bg-green-200" name='name' />
                <button type="submit">Create</button>
            </form>
        </>
    )
}

export default NewPost