import PostContent from "@/components/post.markdown.content";
import { Database } from "@/lib/database.types";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Markdown from "react-markdown"

type Props = {
    params: {
        id: string,
        user: string,
    }
}

const PostPage = async (props: Props) => {

    const supabase = createServerComponentSupabaseClient<Database>({
        headers,
        cookies,
    });

    const { data: post } = await supabase.from('posts').select('*').eq('id', props.params.id).single();

    const { data } = await supabase.auth.getSession();

    return (
        <div>
            {
                data.session ?
                    <>
                        <p className="text-3xl text-center">
                            {post?.title}
                        </p>
                        <PostContent post={post ?? {}} />
                    </>
                    :
                    <>
                        <p>Your had no permission to this post, please login</p>
                    </>
            }
        </div>
    )
}

export default PostPage