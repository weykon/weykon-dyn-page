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
        <ul className="">
            {
                user && posts?.map((post: any) => (
                    <li className="hover:bg-slate-300"
                        key={post.id}
                        onClick={() => jumpToPost(post.id)}
                    >
                        <p className="font-semibold">
                            {post.title}
                        </p>
                        <p className="text-right">
                            {new Date(post.created_at).toLocaleString()}
                        </p>
                    </li>
                ))
            }
        </ul>
    )

}


export default PostList