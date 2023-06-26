import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import SignOut from "../signout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
type Props = {
    user?: { name: string }
}
export default async function Topbar(props: Props) {
    const supabase = createServerComponentClient({ cookies })
    const { session } = (await supabase.auth.getSession()).data;
    return (
        <div className="absolute w-full flex justify-start">
            <div className={'absolute blur-md bg-gradient-to-r from-slate-300 to-slate-500 h-10 flex w-full dark:to-slate-700 dark:from-slate-400'} />
            <div className=" justify-center items-center backdrop-blur-md  h-10 flex">
                <Link href='/'
                    className=" text-xl font-bold text-left h-full left-10 items-center justify-center flex mx-5"
                >
                    Home
                </Link>
                {
                    props.user ?
                        <Link href={`/${props.user.name}/posts`}
                            className=" text-xl font-bold text-left h-full left-10 items-center justify-center flex mx-5"
                        >
                            Post
                        </Link> : <>
                        </>
                }
                {
                    session ?
                        <SignOut />
                        :
                        <Link href='/auth'
                            className='text-center w-full'
                        >
                            Join as a User
                        </Link>
                }
            </div>
        </div>
    )
}