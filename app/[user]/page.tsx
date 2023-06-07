import { Database } from "@/lib/database.types";
import { getSupabase } from "@/server.supabse";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
type Props = {
    params: {
        user: string
    }
}
const UserProfilePage = async (props: Props) => {
    const supabase = getSupabase()
    const { data } = await supabase.auth.getSession()

    if (!data.session) {
        redirect(`auth`)
    }

    console.log('data', data)
    const { data: user, error } = await supabase.from('users').select('name').eq('name', props.params.user).single();

    console.log(user)
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
                        <a href={`${user.name}/posts`} >posts</a>
                    </u>
                </div>

            }
        </div >
    )
}

export default UserProfilePage;