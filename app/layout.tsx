import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '../components/supabase.provider'
import { getSupabase } from '@/server.supabse'
import { revalidatePath } from 'next/cache'
import Topbar from './@topbar/page'
import { Metadata } from 'next'

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
export const revalidate = 5 * 60;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = getSupabase();
  const { session } = (await supabase.auth.getSession()).data;
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
        <SupabaseProvider >
          {/* @ts-expect-error Async Server Component */}
          <Topbar session={session} />
          <div className='my-bg pt-10 flex items-center justify-center h-full dark:bg-gradient-to-b dark:from-black dark:to-slate-700'>
            {children}
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
