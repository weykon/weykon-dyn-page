'use client'

import { Database } from "@/lib/database.types";
import { useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation";
type Post = Database["public"]["Tables"]["posts"]["Row"];

const PostList = ({ posts }: { posts: Partial<Post>[] }) => {
    const user = useUser()
    const router = useRouter()

    const jumpToPost = (id: string) => {
        router.push(`/weykon/posts/${id}`)
    }

    return (
        <ul className="w-full text-left">
            {
                user && posts?.map((post: any) => (
                    <li className="dark:hover:bg-slate-600 hover:bg-slate-300 mt-5 mb-5 border-zinc-300 rounded-lg border-2 mx-24 p-6"
                        key={post.id}
                        onClick={() => jumpToPost(post.id)}
                    >
                        <p className="font-semibold text-xl">
                            {post.title}
                        </p>
                        <p className="text-right mt-8">
                            {new Date(post.created_at).toLocaleString()}
                        </p>
                    </li>
                ))
            }
        </ul>
    )

}


export default PostList