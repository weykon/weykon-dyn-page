'use client'
export default function LocalTimeAtClient({ time }: { time: string }) {
  return <p>{new Date(time).toLocaleString()}</p>
}