import '@/app/globals.css'

export default function NewPost({
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