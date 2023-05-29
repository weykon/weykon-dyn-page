'use client'
import type { Database } from "@/lib/database.types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import type MDEditorType from '@uiw/react-md-editor';

const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((mod) => mod.default),
    { ssr: false }
) as typeof MDEditorType;

type Post = Database["public"]["Tables"]["posts"]["Row"];
const EditToolPostContent = ({ post, saveOrCancel }: {
    saveOrCancel: (value: string, way: 'save' | 'cancel') => Promise<void>,
    post: Partial<Post>
}) => {
    const [value, setValue] = useState(post?.content ?? '');

    return (
        <div className="">
            <div className="container">
                <MDEditor
                    value={value}
                    onChange={(value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setValue(value ?? '')
                    }}
                />
            </div>
            <div className="space-x-4 pl-4 pt-5 justify-end flex pr-4">
                <button onClick={() => saveOrCancel(value, 'save')}
                    className="w-14 h-10 rounded-md shadow-md bg-cyan-500 text-slate-200 outline hover:outline-blue-500"
                >
                    Save
                </button>
                <button type='submit' className="rounded-md w-14 h-10 bg-gray-500 text-slate-200"
                    onClick={() => saveOrCancel(value, 'cancel')}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditToolPostContent
