import '@/app/globals.css'

export default function AuthPage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="my-10">
            {
                children
            }
        </div>
    )

}