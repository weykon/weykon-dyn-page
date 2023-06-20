import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const subscriptions = [
    {
        name: "basic",
        price: "3 dollars per month",
        description: "basic subscription\n1,000tokens",
    },
    {
        name: "premium",
        price: "5 dollars per month",
        description: "premium subscription\n10,000tokens",
    },
    {
        name: "organization",
        price: "10 dollars per month",
        description: "organization subscription\n100,000tokens",
    }
]


export default async function PaymentLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerComponentClient({cookies})

    const { data, error } = await supabase.auth.getSession()
    console.log(data, error)
    if (error !== null) {
        return (
            <div className="flex flex-col items-center">
                <h1>Hello Root Layout Payment</h1>
                {children}
                <a className="w-24 h-16 bg-teal-400 dark:bg-teal-800 rounded-md text-center flex justify-center items-center"
                    href="/auth"
                >
                    <p>try a look</p>
                </a>
            </div>
        );
    } else {
        return (
            <div className="flex w-full justify-around text-center mt-10">
                {
                    subscriptions.map((subscription) => {
                        return (
                            <div className="flex flex-col items-center w-48 dark:bg-neutral-700 bg-neutral-300 rounded-xl p-6">
                                <p>{subscription.name}</p>
                                <p>{subscription.price}</p>
                                <p>{subscription.description}</p>
                                <button className="w-24 h-16 bg-teal-400 dark:bg-teal-800 rounded-md mt-12">
                                    subscribe
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        )

    }

}