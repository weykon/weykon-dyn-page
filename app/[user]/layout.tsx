import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

export default async function UserProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    if (!data.session) {
        redirect(`/auth`)
    }

    const { data: user, error } = await supabase.from('users').select('name').eq('id', data.session.user.id).single();
    
    if (error) {
        notFound()
    }

    return (
        <div className="text-center">
            <p>Hi, Welcome!</p>
            {
                <div >
                    <p>this is </p>
                    <p className="text-3xl text-center font-bold">
                        {user.name}
                    </p>
                    <p>profile page</p>
                    <u>
                        <a href={`/${user.name}/posts`} >posts</a>
                    </u>
                </div>
            }
        </div >
    )
}