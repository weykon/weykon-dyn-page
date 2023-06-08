'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CountDownComp() {
  const router = useRouter()
  useEffect(() => {
    const time = setTimeout(() => {
      router.push('/auth')
    }, 2 * 1000)
    return () => {
      clearTimeout(time)
    }
  }, [])
  return (
    <span className="countdown">
      2 seconds later jump to login in page
    </span>
  );
}