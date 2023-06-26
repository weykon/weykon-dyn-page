import Link from "next/link";
import SignOut from "../signout";

type Props = {
    user?: { name: string }
}

export default async function Topbar(props: Props) {
    return (
        <div className="absolute w-full flex justify-start">
            <div className={'absolute blur-md bg-gradient-to-r from-slate-300 to-slate-500 h-10 flex w-full dark:to-slate-700 dark:from-slate-400'} />
            <div className=" justify-center items-center backdrop-blur-md  h-10 flex">
                <Link href='/'
                    className=" text-xl font-bold text-left h-full left-10 items-center justify-center flex mx-5"
                >
                    Home
                </Link>
                {
                    props.user ?
                        <Link href={`/${props.user.name}/posts`}
                            className=" text-xl font-bold text-left h-full left-10 items-center justify-center flex mx-5"
                        >
                            Post
                        </Link>
                        : <></>
                }
                {
                    props.user ?
                        <SignOut />
                        :
                        <Link href='/auth'
                            className='text-center w-full'
                        >
                            Join as a User
                        </Link>
                }
            </div>
        </div>
    )
}