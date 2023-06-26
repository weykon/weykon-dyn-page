import { notFound } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AskSummary from "@/components/aitalk";
import LocalTimeAtClient from "./client.local.time";
import Pagination from "./pagination";

type Props = {
    params: {
        user: string,
    },
    searchParams: {
        p: string,
    }
}

export const revalidate = 60;
const perPage = 4;

export default async function PostListPage(props: Props) {
    const supabase = createServerComponentClient({ cookies })
    const { data: { session } } = await supabase.auth.getSession();
    let current = isNaN(Number(props.searchParams.p)) ? 1 : Number(props.searchParams.p);

    const getPagination = (page: number, size: number) => {
        const limit = size ? +size : 3
        const from = page ? page * limit : 0
        const to = page ? from + size - 1 : size - 1
        return { from, to }
    }

    if (!session) {
        notFound();
    }

    const { from, to } = getPagination(current - 1, perPage);
    const { data: posts, count } = await supabase
        .from('posts')
        .select('id,title,created_at,owner,summary', { count: "exact" })
        .eq('owner', session.user!.id)
        .order('created_at', { ascending: false })
        .range(from, to);

    return (
        <div className="justify-center items-center text-center mt-2 flex flex-col">
            <div className="bg-gradient-to-r from-gray-200 dark:from-gray-700 via-gray-300 dark:via-gray-800 to-gray-300 dark:to-gray-900 border-[1px] rounded-md mt-2 dark:border-gray-600 h-14 w-32 flex justify-center items-center shadow-md ">
                <a
                    className="w-full h-full justify-center items-center flex dark:text-white "
                    href={`/${props.params.user}/posts/new`}
                >
                    new post
                </a>
            </div>
            <ul>
                {
                    posts?.map((post: any) => (
                        <li key={post.id} className=" gap-3 flex flex-col max-w-sm p-6 bg-white border my-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                            <AskSummary id={post.id} init_summary={post.summary} />
                            <a href={`posts/${post.id}`} className='flex justify-center h-14 w-32 items-center shadow-md bg-gray-200 dark:bg-gray-600 rounded-md self-end '>
                                read
                            </a>
                            <div className="text-right ">
                                <LocalTimeAtClient time={(post.created_at as string) ?? ''} />
                            </div>
                        </li>
                    ))
                }
            </ul>
            <Pagination
                current={current}
                count={count ?? 0}
                perPage={perPage}
            />
        </div >
    )
}