'use client'
import '@/app/globals.css'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { redirect, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AuthPage() {
    const supabase = useSupabaseClient();
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState<number>(0);
    const [error, setError] = useState<Error | null>(null);

    const logError = (error: Error | null) => {
        if (!error) {
            setError(null)
        } else {
            setError(error)
        }
    }

    const onSubmitIn = async (formData: FormData) => {
        const { email, password } = Object.fromEntries(formData.entries());
        const { data: user, error } = await supabase.auth.signInWithPassword({
            email: email.toString(),
            password: password.toString(),
        });
        logError(error)
    }

    const handleSignUp = async (e: FormData) => {
        const { email, password } = Object.fromEntries(e.entries());
        const { data: user, error } = await supabase.auth.signUp({
            email: email.toString(),
            password: password.toString(),
        })
        logError(error)
    }

    const pick = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
    const grey = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"

    return (
        <div className='flex flex-col items-center h-full justify-center transition-all'>
            <div className='flex justify-between w-auto'>
                <button
                    className={`${id === 0 ? pick : grey}`}
                    onClick={() => {
                        setId(0)
                    }}>
                    Sign In
                </button>
                <button
                    className={`${id === 1 ? pick : grey}`}
                    onClick={() => {
                        setId(1)
                    }}>
                    Sign Up
                </button>
            </div>
            <div className="justify-center flex flex-col w-72 rounded-md overflow-hidden shadow-lg p-10 transition-all duration-200">
                {
                    id === 0 ?
                        <form action={onSubmitIn}>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input name={'email'} type="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Password</label>
                            <input name={'password'} type="password" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***" />
                            {loading ? <button disabled type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Loading...
                            </button>
                                :
                                <button type="submit" className="mt-8 w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Login
                                    <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </button>
                            }

                        </form>
                        : id === 1 ?
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
                            : <FixName />
                }
            </div >
            {error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
        </div>
    )
}

export function FixName() {
    const supabase = useSupabaseClient();
    const router = useRouter();
    const handleChangeName = async (e: FormData) => {
        const { name } = Object.fromEntries(e.entries());
        const user = (await supabase.auth.getUser()).data.user;
        const { data, error } = await supabase.from('users').update({ name: name.toString() }).eq('id', user?.id);
        if (!error) {
            router.replace(`${name}`)
        }
    }
    return (
        <div className="mt-10">
            <form action={handleChangeName}>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">输入你的用户名</label>
                <input name={'name'} type="text" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***" />
                <button type="submit" className="mt-8 w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    OK
                </button>
            </form>
        </div>
    )
}