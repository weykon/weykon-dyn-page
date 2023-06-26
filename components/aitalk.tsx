'use client'
import { useSession } from "@supabase/auth-helpers-react"
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source"
import { useEffect, useRef, useState } from "react"
import { Database } from "@/lib/database.types"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

function AskSummary({ id, init_summary }: { id: string, init_summary?: string }) {
    const supabase = createClientComponentClient<Database>()
    const [summary, setSummary] = useState<string>(init_summary ?? '')
    const [isRequestDone, setIsRequestDone] = useState(true);
    const reqCtrlRef = useRef<AbortController | null>(null)

    useEffect(() => {
        if (isRequestDone && reqCtrlRef) {
            supabase.from('posts')
                .update({ summary: summary })
                .eq('id', id).then((res) => { })
        }
    }, [isRequestDone, summary])

    const handleButtonClick = async () => {
        // 取消上一个请求
        if (reqCtrlRef.current) {
            reqCtrlRef.current.abort();
        }

        // 重置 Summary
        setSummary('');
        setIsRequestDone(false);

        // 发起新请求
        const reqCtrl = new AbortController();
        reqCtrlRef.current = reqCtrl;
        try {
            const { data: { session } } = await supabase.auth.getSession();
            fetchEventSource('https://aojptevubhpugssjpckf.supabase.co/functions/v1/aisay',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'authorization': 'Bearer ' + session?.access_token,
                    },
                    body: JSON.stringify({ id }),
                    signal: reqCtrl.signal,
                    async onopen(response) {
                        console.log('onopen')
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
                                setSummary((pre) => pre + text)
                            }

                        } catch (error) {
                            console.log("aborting", error)
                            reqCtrl.abort();
                        }
                    },
                    onerror(err) {
                        console.log('err', err)
                        setSummary(`something ran error: ${err}`);
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
        <button className=" w-72 flex justify-center break-words h-16 items-center shadow-md bg-gray-200 dark:bg-gray-600 rounded-md  text-gray-500 dark:text-gray-200"
            onClick={handleButtonClick}
            disabled={!isRequestDone}
        >
            {
                summary === '' ? 'generate summary by GPT' : summary
            }
        </button>
    )
}

export default AskSummary;

// Test with curl:
// curl --request POST 'http://localhost:54331/functions/v1/aisay' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg1NzI1OTUyLCJzdWIiOiIwNGEzNWQ3Yy00NGMyLTQ3NWUtYTFmYi00OWU1ZjE3OGQyOTciLCJlbWFpbCI6IndleWtvbkBxcS5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY4NTcyMjM1Mn1dLCJzZXNzaW9uX2lkIjoiNzYwNzMzODgtNDAzMy00Yjg2LWFkOWEtZDQ3ZmFmY2FmMWM5In0.IxLyu8y5_XoG05e5qgt1AU5tdYgQ5dwdk_mP-r-rLMQ' \
//   --header 'Content-Type: application/json' \
//   --data '{ "query":"Hi" }'


