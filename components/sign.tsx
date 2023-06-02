'use client'

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React, { experimental_useOptimistic as useOptimistic, useRef, useState } from "react"

export const SignIn = () => {
    const supabase = useSupabaseClient();
    const router = useRouter()
    const user = useUser()

    const onSubmitIn = async (formData: FormData) => {
        const { email, password } = Object.fromEntries(formData.entries())

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.toString(),
            password: password.toString()
        })
        console.log(' error', error)

        if (!error) {
            const { data: user_data, error } = await supabase.from('users').select('name').eq('id', data.user?.id).single()
            if (!error)
                router.replace(`/${user_data?.name}`)
            else {
                router.replace(`/auth/newuser`)
            }
        }
    }

    return (
        <>
            {user ?
                <>
                    <button onClick={async () => {
                        await supabase.auth.signOut()
                        revalidatePath('/')
                    }}>Sign Out</button>
                </>
                :
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <form action={onSubmitIn} className='flex flex-col '>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input name={'email'} type="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Password</label>
                        <input name={'password'} type="password" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***" />
                        <button type="submit" className="mt-8 w-8/12 text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login
                            <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </form>
                </div>
            }

        </>
    )
}

export const SignUp = () => {
    const supabase = useSupabaseClient();
    const router = useRouter()

    const onSubmitUp = async (formData: FormData) => {
        const { email, password } = Object.fromEntries(formData.entries())
        const { data, error } = await supabase.auth.signUp({
            email: email.toString(),
            password: password.toString()
        })

        if (!error) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.toString(),
                password: password.toString()
            })

            if (!error) {
                router.replace('/auth/newuser')
            }
        }
    }

    return (
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <form action={onSubmitUp} className='flex flex-col '>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input name={'email'} type="email" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">We’ll never share your details. Read our <a href="#" className="font-medium text-blue-600 hover:underline dark:text-blue-500">Privacy Policy</a>.</p>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-2">Password</label>
                <input name={'password'} type="password" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="***" />
                <button type="submit" className="mt-8 w-8/12 text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Join in
                    <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
            </form>
        </div>
    )

}
