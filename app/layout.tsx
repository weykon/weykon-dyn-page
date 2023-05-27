import './globals.css'
import { Inter } from 'next/font/google'
import SupabaseProvider from '../components/supabase.provider'
import TopBar from '../components/top.bar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'weykon blog',
  description: 'a test for myself',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className='dark'>
      <body>
        <div className='my-bg h-screen w-screen dark:bg-gradient-to-b dark:from-black dark:to-slate-700'>
          <SupabaseProvider>
            <TopBar />
            {children}
          </SupabaseProvider>
        </div>
      </body>
    </html>
  );
}