import "xhr_polyfill";
import { serve } from "std/server";
import { CreateCompletionRequest } from "openai";
import { corsHeaders } from "../_shared/cors.ts";
import { checkAuth } from "../_shared/auth.ts";

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
