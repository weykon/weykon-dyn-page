import '@/app/globals.css'

export default function AuthPage({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <div className='flex flex-1 items-center h-full w-full justify-center'>
            {
                children
            }
        </div>
    )
}