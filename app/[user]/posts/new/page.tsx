
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

type Props = {
    params: {
        user: string,
    }
}
const NewPost = async (props: Props) => {
    const handleSubmit = async (e: FormData) => {
        'use server'
        const { name } = Object.fromEntries(e.entries());
        const supabase = createServerActionClient({cookies})
        const user = (await supabase.auth.getUser()).data.user;
        const { data, error } = await supabase.from('posts').insert({
            title: name.toString(),
            owner: user?.id,
            content: 'this is the new post here!'
        }).single();

        if (!error) {
            const { data, error } = await supabase.from('posts').select('id').order('created_at', { ascending: false }).eq('owner', user?.id).limit(1);
            if (!error) {
                redirect(`${props.params.user}/posts/${data[0]?.id}`)
            }
        }else { 
            throw new Error(`${error.message}`)
        }
    }
    return (
        <div className="w-full flex flex-col items-center mt-10">
            <form action={handleSubmit} className='flex flex-col text-black dark:text-white items-center w-8/12'>
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type in the Post name: </p>
                <input name="name" type="text"  aria-describedby="helper-text-explanation" className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                <button type="submit" className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-300 border-2  dark:bg-gray-800 rounded-md mt-2 dark:border-yellow-50 h-14 w-32 flex justify-center items-center shadow-md">Create</button>
            </form>
        </div>
    )
}

export default NewPost