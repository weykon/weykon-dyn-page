import '@/app/globals.css'

export default function UserProfile({
    children,
}: {
    topbar: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    )
}