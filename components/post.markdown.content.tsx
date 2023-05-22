'use client'
import { Database } from "@/lib/database.types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Markdown from "react-markdown"
import EditToolPostContent from "./edit.tool.post.content";


type Post = Partial<Database['public']['Tables']['posts']['Row']>;
const PostContent = ({ post }: { post: Post }) => {
    const [editting, setEditting] = useState(false)
    const router = useRouter()
    const supabase = useSupabaseClient()
    const saveOrCancel = async (value: string, way: 'save' | 'cancel') => {
        if (way === 'cancel') {
            setEditting(false)
        } else if (way === 'save') {
            const result = await supabase.from('posts').update({ content: value }).eq('id', post?.id ?? '')
            setEditting(false)
            router.refresh();
        }
    }
    return (
        <div className="relative">
            <button className="fixed top-2 right-10 border-slate-400 w-2 h-2 rounded-md"
                onClick={() => {
                    setEditting(!editting)
                }}
            >
                {editting ? 'editting' : 'edit'}
            </button>
            {
                editting ?
                    <EditToolPostContent post={post ?? {}} saveOrCancel={saveOrCancel} />
                    :
                    <Markdown className='pt-2'>
                        {post?.content ?? ''}
                    </Markdown>
            }

        </div>
    )
}

export default PostContent;