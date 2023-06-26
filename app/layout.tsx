import './globals.css'
import { Inter } from 'next/font/google'
import { revalidatePath } from 'next/cache'
import Topbar from './@topbar/page'
import { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'weykon blog',
  description: 'a test for myself',
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: "Weykon's Blog",
    statusBarStyle: "default",
  },
}
export const revalidate = 60;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies })
  const { session } = (await supabase.auth.getSession()).data;
  const { data: user, error } = await supabase.from('users').select('name').eq('id', session?.user.id).single();
  console.log('user', user)
  if (!session) {
    revalidatePath(`/auth`)
  }
  return (
    <html lang="en" className='dark'>
      <head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body>
        {/* @ts-expect-error Async Server Component */}
        <Topbar user={user} />
        <div className='my-bg pt-10 flex items-center justify-center h-full dark:bg-gradient-to-b dark:from-black dark:to-slate-700'>
          {children}
        </div>
      </body>
    </html>
  );
}
