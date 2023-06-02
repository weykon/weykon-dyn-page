import "xhr_polyfill";
import { serve } from "std/server";
import { CreateCompletionRequest } from "openai";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "@supabase/supabase-js";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const check = await checkAuth(req);
  console.log("check", check);

  if (!check) {
    return new Response("Not allowed", { status: 403, headers: corsHeaders });
  }

  let { query } = await req.json();
  if (!query) {
    query = "hi";
  }
  const completionConfig: CreateCompletionRequest = {
    model: "text-davinci-003",
    prompt: query,
    max_tokens: 256,
    temperature: 0.8,
    stream: true,
  };
  return fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(completionConfig),
  });
});


export async function checkAuth(req: Request) {
  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );
    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    console.log('user, ', user)
    if(!user){
      return false
    }

    // And we can run queries in the context of our authenticated user
    const { data, error } = await supabaseClient.from("ai_user_use").select("*")
      .eq('id',user?.id)
      .eq("can_use", true);
      
    if (error) throw error;
    if (!data) throw new Error("User not allowed to use AI");
    return true;
  } catch (error) {
    console.log(error)
    return false;
  }
}
