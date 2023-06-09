import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import SelfMe from "./selfme"

type Props = {
    params: {
        user: string
    }
}

export const revalidate = 60
const UserProfilePage = async (props: Props) => {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase.auth.getSession()

    if (!data.session) {
        redirect(`/auth`)
    }

    const { data: user, error: userErr } = await supabase.from('users').select('name').eq('id', data.session.user.id).single();

    return (
        <div className="text-center">
            <p>Hi, Welcome!</p>
            {
                <div >
                    <p>this is </p>
                    <p className="text-3xl text-center font-bold">
                        {user?.name}
                    </p>
                    <p>profile page</p>
                    <u>
                        <a href={`/${user?.name}/posts`} >posts</a>
                    </u>
                </div>
            }
            <SelfMe user={props.params.user}/>
        </div >
    )
}

export default UserProfilePage;