'use client'

import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { EventSourceMessage, fetchEventSource } from "@microsoft/fetch-event-source"
import { useState } from "react"
function AskSummary({ id }: { id: string }) {
    const session = useSession()
    const [summary, setSummary] = useState<string>('')
    const supabase = useSupabaseClient()

    return (
        <button className="w-28 h-20 text-gray-500 dark:text-gray-200"
            onClick={async () => {
                const { data, error } = await supabase.from('posts').select('content').eq('id', id).single();
                if (!error) {
                    console.log(data)
                    const prompt = `请你用20个字写一下这篇文章的概括，对应好他的语言，如果原文是英文就用英文回复，如果是中文就用中文,以下将是一段文章：${data.content}`
                    const reqCtrl = new AbortController()
                    fetchEventSource('https://aojptevubhpugssjpckf.functions.supabase.co/aisay',
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                'authorization': 'Bearer ' + session?.access_token,
                            },
                            body: JSON.stringify({ query: prompt }),
                            signal: reqCtrl.signal,
                            async onopen(response) {
                                console.log('onopen')
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
                                        return
                                    }
                                    let text = JSON.parse(data).choices[0].text
                                    setSummary(summary + text)
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
                } else {
                    console.log(error)
                }
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


