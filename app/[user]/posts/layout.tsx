import '@/app/globals.css'

export default function PostList({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="">
            <ul className="w-full">
                {
                    children
                }
            </ul>
        </div>
    )
}