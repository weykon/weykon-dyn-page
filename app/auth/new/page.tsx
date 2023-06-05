import { getSupabase } from "@/server.supabse";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from 'next/navigation'
const NewUser = async () => {

    const supabase = getSupabase();

    const user = (await supabase.auth.getUser()).data.user;
    
    const handleSignUp = async (e: FormData) => {
        'use server'
        const { email, password } = Object.fromEntries(e.entries());
        const supabase = getSupabase();
        const { data, error } = await supabase.auth.signUp({
            email: email.toString(),
            password: password.toString(),
        })
        console.log('handleSignIn', user, error)
        if (!error) {
            
        }
    }

    return (
        <div className='flex flex-col w-8/12'>
            <form action={handleSignUp} >
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input name={'email'} type="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Password</label>
                <input name={'password'} type="password" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***" />
                <button type="submit" className="mt-8 w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Join !
                    <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </form>
        </div>
    )
}

export default NewUser