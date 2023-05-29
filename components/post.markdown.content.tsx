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
            const result = await supabase.from('posts')
                .update({
                    content: value,
                    modified_at: new Date().toUTCString()
                })
                .eq('id', post?.id ?? '')
            setEditting(false)
            router.refresh();
        }
    }
    return (
        <div className="relative">
            <button className="absolute top-0 right-10 ring-2 w-16 h-10 rounded-md bg-slate-200 ring-slate-400"
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
                    <Markdown className='pt-10 text-left px-10'>
                        {post?.content ?? ''}
                    </Markdown>
            }

        </div>
    )
}

export default PostContent;