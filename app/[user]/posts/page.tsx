import PostList from "@/components/post.list";
import { getSupabase } from "@/server.supabse";
import Link from "next/link";
import { notFound } from "next/navigation";

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

    if(!userdata.user){
        notFound();
    }
    const { data: posts } = await supabase.from('posts').select('id,title,created_at,owner')
        .eq('owner', userdata.user!.id)
    return (
        <div className="justify-center items-center text-center mt-8 flex flex-col">
            <p className=" text-lg">this is posts list page</p>
            <div className="border-2 border-black rounded-md mt-10 dark:border-yellow-50 h-14 w-32 flex justify-center items-center">
                <Link
                    className="w-full h-full justify-center items-center flex"
                    href={{ pathname: `${props.params.user}/posts/new` }}
                >
                    new post
                </Link>
            </div>

            {/* <a href={`${props.params.user}/posts/new`}>new posts</a> */}
            <PostList posts={posts ?? []} />
        </div>
    )
}

