import PostContent from "@/components/post.markdown.content";
import { getSupabase } from "@/server.supabse";
import Link from "next/link";
import { notFound } from "next/navigation";
import CountDownComp from "./Countdonw";

type Props = {
    params: {
        id: string,
        user: string,
    }
}

const PostPage = async (props: Props) => {

    const supabase = getSupabase()

    const { data: post } = await supabase.from('posts').select('*').eq('id', props.params.id).single();

    const { data } = await supabase.auth.getSession();

    return (
        <div className="relative text-center items-center justify-center w-full h-full mt-5">
            {
                data.session ?
                    <>
                        <p className="text-3xl text-cente">
                            {post?.title}
                        </p>
                        <PostContent post={post ?? {}} />
                    </>
                    :
                    <>
                        <p>Your had no permission to this post, please login</p>
                        <CountDownComp />
                    </>
            }
            <div className="mt-20 bottom-6 w-full justify-center flex">
                <Link className={'text-white bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'}
                    href={`/${props.params.user}/posts`}
                >
                    Posts
                </Link>
            </div>
        </div>
    )
}

export default PostPage