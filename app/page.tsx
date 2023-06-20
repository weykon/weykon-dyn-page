import Aitalk from "@/components/aitalk";
import {  createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const revalidate = 5;

export default async function ServerComponent() {
  const supabase = createServerComponentClient({cookies})
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  return (
    <div className='relative w-full text-center flex flex-col sm:justify-start md:justify-center'>
      <div className="px-4 mx-auto max-w-screen-xl text-center lg:py-16 flex justify-center items-center flex-col">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Explore the vast and wonderful world!</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Welcome to my experimental blog! Register to view all posts, password-free and open source. All blog articles are only visible to logged-in users. Please refrain from writing personal data. Join me on my journey to improve my backend technology stack!</p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          {
            session ?
              <a href="weykon/posts" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Read My Posts
                <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>
              : <a href="auth" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                Join me
                <svg aria-hidden="true" className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              </a>
          }
          <div className="py-3 px-5 text-base font-medium text-start text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            <p>if you want a quickly dialog, DM me.</p>
            <li>discord: Weykon#4189 </li>
            <li>twitter: <u><a href="https://twitter.com/WeykonK">WeykonK</a></u></li>
          </div>
        </div>
      </div>
      <div className=" bottom-2 flex flex-col justify-center items-center text-left text-sm justify-items-center w-full py-2">
        <div className="flex flex-col justify-start pt-10 pb-5 mx-5 text-sm">
          <p>If you&apos;re interested in my work, please check out my GitHub profile.  <u><a href="https://github.com/weykon">go!</a></u></p>
          <p>if you want to contact me, send me a email. <u><a href="mailto:weykon@qq.com">weykon@qq.com</a></u></p>
        </div>
      </div>
    </div>
  );
}
