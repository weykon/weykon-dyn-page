import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "./lib/database.types";
const supabse = () => createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
});

export function getSupabase() {
    return supabse();
}