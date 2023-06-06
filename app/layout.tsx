import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '../components/supabase.provider'
import { getSupabase } from '@/server.supabse'
import { revalidatePath } from 'next/cache'
import Topbar from './topbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'weykon blog',
  description: 'a test for myself',
}

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
        <div className='my-bg h-screen w-screen dark:bg-gradient-to-b dark:from-black dark:to-slate-700'>
          <SupabaseProvider >
            {/* @ts-expect-error Async Server Component */}
            <Topbar session={session} />
            {children}
          </SupabaseProvider>
        </div>
      </body>
    </html >
  );
}
