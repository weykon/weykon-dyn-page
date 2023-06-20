import "xhr_polyfill";
import { serve } from "std/server";
import { CreateCompletionRequest } from "openai";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "@supabase/supabase-js";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
   
  return fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
});


/// this file to help users self talk, yes, it is more thing of embeddings.
/// remember the user habit and character, all the sentences and thinking are from theirs own.
/// Users ask themselves about their current situation, output the advice from ai thinking.
