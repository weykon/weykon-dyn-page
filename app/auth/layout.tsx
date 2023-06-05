import '@/app/globals.css'
import Link from 'next/link'

export default function AuthPage({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className='flex flex-row'>
                <Link href={'/auth'} className=" w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Sign In
                </Link>
                <Link href={'/auth/new'} className="  w-full text-white justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Sign Up
                </Link>
            </div>
            {children}
        </div>
    )
}