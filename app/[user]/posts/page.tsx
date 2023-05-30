import { getSupabase } from "@/server.supabse";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
    params: {
        user: string,
    },
    searchParams: {
        p: string,
    }
}

// do not cache this page
export const revalidate = 0;
export default async function PostListPage(props: Props) {
    const perPage = 4;
    const supabase = getSupabase()
    const { data: userdata } = await supabase.auth.getUser();
    if (!userdata.user) {
        notFound();
    }

    if (isNaN(Number(props.searchParams.p))) {
        props.searchParams.p = '1'
    }

    const current = Number(props.searchParams.p);
    const { from, to } = getPagination(Number(props.searchParams.p) - 1, perPage);
    const { data: posts, count } = await supabase
        .from('posts')
        .select('id,title,created_at,owner', { count: "exact" })
        .eq('owner', userdata.user!.id)
        .order('created_at', { ascending: false })
        .range(from, to);

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
            <ul className="w-full text-left">
                {
                    posts?.map((post: any) => (
                        <a href={`posts/${post.id}`} key={post.id} >
                            <li
                                className="dark:hover:bg-slate-600 hover:bg-slate-300 my-5 border-zinc-300 rounded-lg border-2 mx-24 p-6"
                            >
                                <p className="font-semibold text-xl">
                                    {post.title}
                                </p>
                                <p className="text-right mt-8">
                                    {new Date(post.created_at).toLocaleString()}
                                </p>
                            </li>
                        </a>
                    ))
                }
            </ul>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    <li>
                        <a href={`?p=${current == 1 ? 1 : current - 1}`} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    {
                        new Array(Math.ceil((count ?? 0) / perPage)).fill(0).map((_, i) => (
                            <li key={i}>
                                <a href={`?p=${i + 1}`}
                                    className={`${current == i + 1 ? 'bg-neutral-200' : 'bg-white'} px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                                >{i + 1}</a>
                            </li>
                        ))
                    }
                    <li>
                        <a href={`?p=${count == current ? count : current + 1}`} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1
    return { from, to }
}

