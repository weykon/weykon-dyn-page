import '@/app/globals.css'

export default function UserProfile({
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