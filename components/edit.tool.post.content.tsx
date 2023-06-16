'use client'
import type { Database } from "@/lib/database.types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
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
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        const value = localStorage.getItem('temporary-post-typing')
        console.log('settign sdilaog', value)
        if (value) {
            console.log('settign sdilaog', dialog)
            setDialog(true)
        }
        return () => {
            localStorage.removeItem('temporary-post-typing')
        }
    }, [])

    return (
        <div className="flex flex-col">
            <div className="container flex justify-center pt-10 flex-col">
                {
                    dialog && <div >
                        <p>force QUIT last time, there is cache, would you continue ?</p>
                        <button onClick={() => {
                            setDialog(false)
                            localStorage.removeItem('temporary-post-typing')
                        }}>
                            Cancel
                        </button>
                        <button onClick={() => {
                            const value = localStorage.getItem('temporary-post-typing')
                            setValue(value ?? '')
                            setDialog(false)
                        }}>
                            Confirm
                        </button>
                    </div>
                }
                <MDEditor
                    value={value}
                    onChange={(value?: string, event?: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setValue(value ?? '')
                        localStorage.setItem('temporary-post-typing', value ?? '')
                    }}
                    preview="edit"
                />

            </div>
            <div className="space-x-4 pl-4 pt-5 justify-end flex pr-4">
                <button onClick={() => {
                    saveOrCancel(value, 'save')
                    localStorage.removeItem('temporary-post-typing')
                }}
                    className="w-14 h-10 rounded-md shadow-md bg-cyan-500 text-slate-200 outline hover:outline-blue-500"
                >
                    Save
                </button>
                <button type='submit' className="rounded-md w-14 h-10 bg-gray-500 text-slate-200"
                    onClick={() => {
                        saveOrCancel(value, 'cancel')
                        localStorage.removeItem('temporary-post-typing')
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default EditToolPostContent
