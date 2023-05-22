"use client";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  const handleLogin = async () => {
    router.push('/auth')
    // await supabase.auth.signInWithPassword({
    //   email: "test@weykon.com",
    //   password: "test@weykon.com",
    // });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className={'h-10 flex justify-between bg-gradient-to-bl from-cyan-500 to-blue-500 items-center  w-full'}>
      {
        user ?
          <button onClick={handleLogout} className='text-center w-full'>Logout</button>
          :
          <button onClick={handleLogin}
            className='text-center w-full'
          >
            Join as a User
          </button>
      }
    </div>
  );
}