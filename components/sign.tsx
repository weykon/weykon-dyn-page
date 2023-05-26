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
                <div className="">
                    <form action={onSubmitIn} className='flex flex-col'   >
                        <input type="email" className="border-2 dark:bg-slate-400" name={'email'} />
                        <input type="password" className="border-2 dark:bg-slate-400" name={'password'} />
                        <button type='submit'>OK</button>
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
        <div className="">
            <form action={onSubmitUp} className='flex flex-col '>
                <input type="email" className="border-2" name={'email'} />
                <input type="password" className="border-2" name={'password'} />
                <button type='submit'>Join in</button>
            </form>
        </div>
    )

}
