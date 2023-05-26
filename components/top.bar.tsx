"use client";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    router.push('/auth')
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="relative">
      <div className={'absolute blur-md bg-gradient-to-r from-slate-300 to-slate-500 h-10 flex w-full dark:to-slate-700 dark:from-slate-400'} />
      <div className=" justify-center items-center backdrop-blur-md  h-10 flex">
        {
          user ?
            <button onClick={handleLogout} className='text-center w-full h-full text-neutral-200'>Logout</button>
            :
            <button onClick={handleLogin}
              className='text-center w-full'
            >
              Join as a User
            </button>
            
        }
      </div>
    </div>
  );
}
