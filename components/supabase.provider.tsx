"use client";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { SessionContextProvider, useUser } from "@supabase/auth-helpers-react";

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient()
  );
  const router = useRouter();
  const user = useUser()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      router.refresh()
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, user, supabase]);

  return (
    <SessionContextProvider supabaseClient={supabase} >
      {children}
    </SessionContextProvider>
  );
}
