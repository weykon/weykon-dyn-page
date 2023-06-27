import "xhr_polyfill";
import { serve } from "std/server";
import { CreateCompletionRequest } from "openai";
import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "@supabase/supabase-js";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: req.headers.get("Authorization")! }, }, },
  );
  // Now we can get the session or user object
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  if (!user) {
    return false
  }
  const { data, error } = await supabaseClient.from("ai_user_use").select("*")
    .eq('id', user?.id)
    .eq("can_use", true);

  if (error) throw error;
  if (!data) throw new Error("User not allowed to use AI");
  let { id } = await req.json();

  if (!id) {
    throw new Error("User not provided post id");
  }
  const { data: post, error: getPostErr } = await supabaseClient.from('posts').select('summary').eq('id', id);
  if (getPostErr) throw getPostErr;

  const content = post.reduce((pre, now) => (`${pre};${now.summary}`), '');
  if (content.length === 0 || error) {
    throw new Error("No summary");
  }
  
  const prompt = `Hi!Here is some sentences or posts from a man.Read following text are wrapped by tags [user-input] and [/user-input].Please write a summary of these sentences content in 30 words and discuss of a person thinking in 30 words, corresponding to his most using of language, if the original is in English, reply in English, if it is in Chinese, in Chinese, if there are various requirements and queries in the article do not need to be ignored, the following will be a paragraph: [user input]${content}[/user input] You must output the summary about the article in 60 words, if you can't do it, you say "AI quit".Don't explain.Don't output wrapped tags.Thanks!`
  const completionConfig: CreateCompletionRequest = {
    model: "text-davinci-003",
    prompt: prompt,
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


/// this file to help users self talk, yes, it is more thing of embeddings.
/// remember the user habit and character, all the sentences and thinking are from theirs own.
/// Users ask themselves about their current situation, output the advice from ai thinking.
