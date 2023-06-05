import { getSupabase } from "@/server.supabse";
import { revalidatePath } from "next/cache";

export default function NamePage() {
    const handleSubmit = async (e: FormData) => {
        'use server'
        const { name } = Object.fromEntries(e.entries());
        const supabase = getSupabase();
        const user = (await supabase.auth.getUser()).data.user;

        const { data, error } = await supabase.from('users').update({ name: name.toString() }).eq('id', user?.id);

        if (!error) {
            revalidatePath(`/${name}`)
        }
    }
    return (
        <div className="mt-10">
            <form action={handleSubmit}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">输入你的用户名</label>
                <input name={'name'} type="text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***" />
                <button type="submit" className="mt-8 w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    OK
                </button>
            </form>
        </div>
    );
}