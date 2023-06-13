'use client'

import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source"
import { useEffect, useState } from "react"
function AskSummary({ id, init_summary }: { id: string, init_summary?: string }) {
    const session = useSession()
    const [summary, setSummary] = useState<string>(init_summary ?? '')
    const [isDone, setIsDone] = useState<boolean>(false)

    const supabase = useSupabaseClient()

    useEffect(() => {
        if (isDone) {
            supabase.from('posts').update({ summary: summary }).eq('id', id).then((res) => {
                console.log('res', res)
            })
        }
    }, [isDone, summary])

    return (
        <button className=" w-72 flex justify-center break-words h-16 items-center shadow-md bg-gray-200 dark:bg-gray-600 rounded-md  text-gray-500 dark:text-gray-200"
            onClick={async () => {
                const reqCtrl = new AbortController()
                fetchEventSource('https://aojptevubhpugssjpckf.functions.supabase.co/aisay',
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
                            setIsDone(false)
                            return
                        },
                        onclose() {
                            console.log('onclose')
                        },
                        onmessage(msg: EventSourceMessage) {
                            console.log('msg', msg)
                            try {
                                const { data } = msg
                                if (data === '[DONE]') {
                                    reqCtrl.abort();
                                    setIsDone(true)
                                    return
                                }
                                let text = JSON.parse(data).choices[0].text;

                                setSummary((pre) => pre + text)
                            } catch (error) {
                                console.log("aborting", error)
                                reqCtrl.abort();
                            }
                        },
                        onerror(err) {
                            console.log('err', err)
                        },
                    }
                )
            }}>
            {summary === '' ? 'generate summary by GPT' : summary}
        </button>
    )
}

export default AskSummary;

// Test with curl:
// curl --request POST 'http://localhost:54331/functions/v1/aisay' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjg1NzI1OTUyLCJzdWIiOiIwNGEzNWQ3Yy00NGMyLTQ3NWUtYTFmYi00OWU1ZjE3OGQyOTciLCJlbWFpbCI6IndleWtvbkBxcS5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7fSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTY4NTcyMjM1Mn1dLCJzZXNzaW9uX2lkIjoiNzYwNzMzODgtNDAzMy00Yjg2LWFkOWEtZDQ3ZmFmY2FmMWM5In0.IxLyu8y5_XoG05e5qgt1AU5tdYgQ5dwdk_mP-r-rLMQ' \
//   --header 'Content-Type: application/json' \
//   --data '{ "query":"Hi" }'


