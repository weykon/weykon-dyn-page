"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { SessionContextProvider, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Database } from "@/lib/database.types";

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient()
  );
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      router.refresh()
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, user, supabase]);

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={session}>
      <UserProfileProvider>
        {children}
      </UserProfileProvider>
    </SessionContextProvider>
  );
}

const UserPublicProfileContext = createContext<Database['public']['Tables']['users']['Row'] | null>(null);

export const useUserProfile = () => {
  const context = useContext(UserPublicProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider')
  }
  return context
}

const UserProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [userProfile, setUserProfile] = useState<Database['public']['Tables']['users']['Row'] | null>(null);
  const supabase = useSupabaseClient();
  const user = useUser();
  useEffect(() => {
    (async () => {
      if (user) {
        const { data, error } = await supabase.from('users').select('*').eq('id', user?.id);
        if (!error) {
          setUserProfile(data as any)
        } else {
          setUserProfile(null)
        }
      }
    })()
  }, [user])
  return (
    <UserPublicProfileContext.Provider value={userProfile}>
      {children}
    </UserPublicProfileContext.Provider>
  );
}
