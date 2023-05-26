import { createServerComponentSupabaseClient, SupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import Link from "next/link";
import SupabaseProvider from "@/components/supabase.provider";
import TopBar from "@/components/top.bar";

// do not cache this page
export const revalidate = 0;

export default async function ServerComponent() {

  return (
    <div className='pt-2 justify-center items-center w-full text-center flex flex-col'>
      <div className="flex flex-col justify-center items-center text-left justify-items-center w-full py-2">
        <div className="flex flex-col justify-start py-10 mx-5">
          <p>Hi! this is my personal page.</p>
          <p>it is built by supabase and next13</p>
          <p>I am learing a lot things, this is my experiment for next13 in first time</p>
          <p>if you any interest on my work, check my github profile. <a href="https://github.com/weykon">go!</a></p>
          <p>if you want to contact me, send me a email. <a href="mailto:weykon@qq.com">weykon@qq.com</a></p>
        </div>

        <ul className=" bg-slate-300 rounded-md w-80 border-2 border-neutral-400 p-2">
          <p>if you want a quickly dialog, DM me.</p>
          <li>discord: </li>
          <li>twitter: <a href="https://twitter.com/WeykonK">WeykonK</a></li>
        </ul>
      </div>
      <div
        className="border-2 border-black rounded-md my-8 w-24 h-16 items-center justify-center flex flex-col"
      >
        <Link
          href="weykon/posts"
        > read my posts </Link>
      </div>
    </div>
  );
}
