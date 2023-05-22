import '@/app/globals.css'

export default function AuthPage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="">
            {
                children
            }
        </div>
    )

}