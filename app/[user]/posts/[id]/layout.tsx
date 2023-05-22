import '@/app/globals.css'

const PostLayout = ({ children }
    : { children: React.ReactNode }
) => {
    return (
        <div className="flex flex-1 w-full">
            {
                children
            }
        </div>
    )
}

export default PostLayout