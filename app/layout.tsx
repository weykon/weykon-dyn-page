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
