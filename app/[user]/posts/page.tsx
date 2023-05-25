import PostList from "@/components/post.list";
import { getSupabase } from "@/server.supabse";
import Link from "next/link";

type Props = {
    params: {
        user: string,
    }
}

// do not cache this page
export const revalidate = 0;

export default async function PostListPage(props: Props) {
    const supabase = getSupabase()
    const { data: userdata } = await supabase.auth.getUser();
    const { data: posts } = await supabase.from('posts').select('id,title,created_at').limit(5)
        .eq('owner', userdata.user?.id);
    console.log('posts', props.params)
    return (
        <div className="justify-center items-center text-center">
            <p>this is posts list page</p>
            <Link className="border-2 border-black rounded-md mt-10"
                href={{ pathname: `${props.params.user}/posts/new` }} >new post</Link>
            {/* <a href={`${props.params.user}/posts/new`}>new posts</a> */}
            <PostList posts={posts ?? []} />
        </div>
    )
}

