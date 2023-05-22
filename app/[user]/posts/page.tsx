import { Database } from "@/lib/database.types";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import PostList from "@/components/post.list";
import { getSupabase } from "@/server.supabse";

type Props = {
    params: {
        user: string,
    }
}

// do not cache this page
export const revalidate = 0;

export default async function PostListPage(props: Props) {
    const supabase = getSupabase()
    const { data: posts } = await supabase.from('posts').select('id,title,created_at').limit(5);

    return (
        <div className=" ">
            <p>this is prots list page</p>
            <a href="/posts/new">new posts</a>
            <PostList posts={posts ?? []} />
        </div>
    )
}

