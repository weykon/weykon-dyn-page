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
            <button className="absolute z-10 sm:top-8 md:top-10 lg:top-12 -top-2 right-10 ring-2 w-16 h-10 rounded-md bg-slate-200 ring-slate-400 dark:bg-slate-800"
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
                    <pre>
                        <Markdown className='pt-10 text-left px-10 whitespace-pre-wrap break-words'
                        
                        >
                            {post?.content ?? ''}
                        </Markdown>
                    </pre>
            }

        </div>
    )
}

export default PostContent;