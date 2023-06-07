import { getSupabase } from "@/server.supabse";
import { Session } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SignOut from "./signout";

export default async function Topbar({ session }: { session: Session }) {
    return (
        <div className="absolute w-full">
            <div className={'absolute blur-md bg-gradient-to-r from-slate-300 to-slate-500 h-10 flex w-full dark:to-slate-700 dark:from-slate-400'} />
            <div className=" justify-center items-center backdrop-blur-md  h-10 flex">
                <Link href='/'
                    className="absolute text-xl font-bold text-left h-full left-10 items-center justify-center flex"
                >
                    Home
                </Link>
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