import AskSummary from "@/components/aitalk";
import { getSupabase } from "@/server.supabse";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
    params: {
        user: string,
    },
    searchParams: {
        p: string,
    }
}
export const revalidate = 5 * 60;
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
        <div className="justify-center place-self-start text-center mt-2 flex flex-col items-center">
            <div className="bg-gradient-to-r from-gray-200 dark:from-gray-700 via-gray-300 dark:via-gray-800 to-gray-300 dark:to-gray-900 border-[1px] rounded-md mt-2 dark:border-gray-600 h-14 w-32 flex justify-center items-center shadow-md ">
                <Link
                    className="w-full h-full justify-center items-center flex dark:text-white "
                    href={`${props.params.user}/posts/new`}
                >
                    new post
                </Link>
            </div>
            <ul className="w-full text-left">
                {
                    posts?.map((post: any) => (
                        <li key={post.id} className="block max-w-sm p-6 bg-white border my-5 border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400 w-72">{post.summary ?? ''}</p>
                            <a href={`posts/${post.id}`} className='flex justify-center w-5'>
                                enter post
                            </a>
                            <AskSummary id={post.id} />
                            <p className="text-right mt-8">
                                {new Date(post.created_at).toLocaleString()}
                            </p>
                        </li>
                    ))
                }
            </ul>
            <ul className="inline-flex -space-x-px mt-5">
                <li>
                    <a href={`?p=${current == 1 ? 1 : current - 1}`} className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
                {
                    new Array(Math.ceil((count ?? 0) / perPage)).fill(0).map((_, i) => (
                        <li key={i}>
                            <a href={`?p=${i + 1}`}
                                className={`${current == i + 1 ? 'bg-neutral-200' : 'bg-white'} px-3 py-2 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                            >
                                {i + 1}
                            </a>
                        </li>
                    ))
                }
                <li>
                    <a href={`?p=${count == current ? count : current + 1}`} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
            </ul>
        </div >
    )
}

const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 3
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1
    return { from, to }
}