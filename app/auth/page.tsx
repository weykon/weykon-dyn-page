'use client'
import { SignIn, SignUp } from "@/components/sign";
import { useState } from "react";

const AuthPage = () => {
    const [tab, setTab] = useState(0)
    return (
        <div className=" justify-center w-full flex">
            <div className="w-26 h-20 rounded-md ">
                <div className=" space-x-4 bg-slate-100">
                    <button onClick={() => setTab(0)}>Sign In</button>
                    <button onClick={() => setTab(1)}>Sign Up</button>
                </div>
                <div className="w-38 bg-slate-200">
                    {tab === 0 && <SignIn />}
                    {tab === 1 && <SignUp />}
                </div>
            </div>
        </div>
    )
}
export default AuthPage;