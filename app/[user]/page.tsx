import { Database } from "@/lib/database.types";
import { getSupabase } from "@/server.supabse";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
type Props = {
    params: {
        user: string
    }
}
const UserProfilePage = async (props: Props) => {
    const supabase = getSupabase()
    const { data: user, error } = await supabase.from('users').select('name').eq('name', props.params.user).single();

    return (
        <div>
            <p>Hi, Welcome!</p>
            {
                user ?
                    <div>
                        <p className="text-3xl text-center font-bold">
                            {user.name}
                        </p>
                        <a href={`${user.name}/posts`}>posts</a>
                    </div>
                    : <>
                        <p>there is no data about <strong>{props.params.user}</strong></p>
                    </>
            }
        </div >
    )
}

export default UserProfilePage;