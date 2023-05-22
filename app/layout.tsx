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
    <html lang="en">
      <body>
        <SupabaseProvider>
          <TopBar />
          <div className='pt-2'>
            {children}
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}