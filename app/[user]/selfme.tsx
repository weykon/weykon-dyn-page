'use client';

import { Database } from "@/lib/database.types";
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRef, useState } from "react";

export default function SelfMe({ user }: { user: string }) {
    const [isRequestDone, setIsRequestDone] = useState(true);
    const reqCtrlRef = useRef<AbortController | null>(null)
    const [content, setContent] = useState<string>('');
    const discussMe = async () => {
        const supabase = createClientComponentClient<Database>()
        // 取消上一个请求
        if (reqCtrlRef.current) {
            reqCtrlRef.current.abort();
        }

        // 重置 Summary
        setContent('');
        setIsRequestDone(false);

        // 发起新请求
        const reqCtrl = new AbortController();
        reqCtrlRef.current = reqCtrl;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            fetchEventSource('https://aojptevubhpugssjpckf.supabase.co/functions/v1/selfme',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': 'Bearer ' + session?.access_token,
                    },
                    body: JSON.stringify({ user }),
                    signal: reqCtrl.signal,
                    async onopen(response) {
                        setIsRequestDone(false);
                        return
                    },
                    onclose() {
                        console.log('onclose')
                        setIsRequestDone(true);
                        reqCtrl.abort();
                    },
                    onmessage(msg: EventSourceMessage) {
                        try {
                            const { data } = msg
                            if (data === '[DONE]') {
                                reqCtrl.abort();
                                setIsRequestDone(true);
                                return
                            } else {
                                let text = JSON.parse(data).choices[0].text;
                                setContent((pre) => pre + text)
                            }

                        } catch (error) {
                            console.log("aborting", error)
                            reqCtrl.abort();
                        }
                    },
                    onerror(err) {
                        console.log('err', err)
                        setContent(`something ran error: ${err}`);
                        reqCtrl.abort();
                        setIsRequestDone(true);
                    },
                }
            )
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <div className="flex flex-col">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={discussMe}
            >
                AI discuss me
            </button>
            <p>Here: </p>
            <p>
                {content}
            </p>
        </div>
    );
}