'use client'
import { SignIn, SignUp } from "@/components/sign";
import { useState } from "react";

const AuthPage = () => {
    const [tab, setTab] = useState(0);
    return (
        <div className="justify-center w-full flex ">
            <div className="w-26 h-24 rounded-md bg-slate-100 dark:bg-slate-600">
                <div className="justify-around flex">
                    <button onClick={() => setTab(0)}>Sign In</button>
                    <button onClick={() => setTab(1)}>Sign Up</button>
                </div>
                <div className="bg-slate-200 dark:bg-slate-600">
                    {tab === 0 && <SignIn />}
                    {tab === 1 && <SignUp />}
                </div>
            </div>
        </div>
    )
}
export default AuthPage;