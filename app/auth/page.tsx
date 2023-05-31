'use client'
import { SignIn, SignUp } from "@/components/sign";
import { useState } from "react";

const AuthPage = () => {
    const [tab, setTab] = useState(0);
    return (
        <div className="justify-center w-full flex ">
            <div className="w-26 h-30 ">
                <div className="justify-around flex w-full h-12 rounded-t-lg bg-slate-100  dark:bg-slate-600">
                    <button onClick={() => setTab(0)}
                        className={`${tab === 0 ? '' : 'blur-sm'} hover:blur-none transition-all duration-200 w-full h-full`}
                    >
                        Sign In</button>
                    <button
                        className={`${tab === 1 ? '' : 'blur-sm'} hover:blur-none transition-all duration-200  w-full h-full`}
                        onClick={() => setTab(1)}
                    >
                        Sign Up
                    </button>
                </div>
                <div>
                    {tab === 0 && <SignIn />}
                    {tab === 1 && <SignUp />}
                </div>
            </div>
        </div>
    )
}
export default AuthPage;