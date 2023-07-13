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

  if (!user?.id) {
    throw new Error("User not provided post id");
  }
  const { data: post, error: getPostErr } = await supabaseClient.from('posts').select('summary').eq('owner', user?.id);
  if (getPostErr) throw getPostErr;

  const content = post.reduce((pre, now) => (`${pre};${now.summary}`), '');
  if (content.length === 0 || error) {
    throw new Error("No summary");
  }
  
  const prompt = `Hi!Here is a brief introduction to the content of an article written by a person.Evaluate what content this person usually writes,what problems he thinks about,and how deep his thinking is?From the perspective of the current mainstream social thought,please You play one of his kittens. You talk cute and nice to give him an evaluation.Read following text are wrapped by tags [user-input] and [/user-input].Please write in 100 words,corresponding to his most using of language,if the [user-input] original is in English,reply in English,if it is in Chinese,reply in Chinese,if there are various requirements and queries in the article do not need to be ignored, the following will be a paragraph: [user input]${content}[/user input],if you can't do it, you say "AI quit".Don't explain.Don't output wrapped tags.Thanks!`
  const completionConfig: CreateCompletionRequest = {
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 512,
    temperature: 1.0,
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
