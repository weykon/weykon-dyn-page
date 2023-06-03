create type "auth"."code_challenge_method" as enum ('s256', 'plain');

create table "auth"."flow_state" (
    "id" uuid not null,
    "user_id" uuid,
    "auth_code" text not null,
    "code_challenge_method" auth.code_challenge_method not null,
    "code_challenge" text not null,
    "provider_type" text not null,
    "provider_access_token" text,
    "provider_refresh_token" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


CREATE UNIQUE INDEX flow_state_pkey ON auth.flow_state USING btree (id);

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);

alter table "auth"."flow_state" add constraint "flow_state_pkey" PRIMARY KEY using index "flow_state_pkey";


create table "public"."profiles" (
    "id" uuid not null,
    "user_id" uuid not null
);


create table "public"."posts" (
    "id" uuid not null default uuid_generate_v4(),
    "created_at" timestamp with time zone default now(),
    "modified_at" timestamp with time zone,
    "owner" uuid,
    "content" text,
    "title" text
);


alter table "public"."posts" enable row level security;

create table "public"."users" (
    "id" uuid not null,
    "posts" json[] not null default '{}'::json[],
    "name" text
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX posts_id_key ON public.posts USING btree (id);

CREATE UNIQUE INDEX posts_pkey ON public.posts USING btree (id);

CREATE UNIQUE INDEX users_id_key ON public.users USING btree (id);

CREATE UNIQUE INDEX users_name_key ON public.users USING btree (name);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."posts" add constraint "posts_id_key" UNIQUE using index "posts_id_key";

alter table "public"."posts" add constraint "posts_owner_fkey" FOREIGN KEY (owner) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."posts" validate constraint "posts_owner_fkey";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."users" add constraint "users_id_key" UNIQUE using index "users_id_key";

alter table "public"."users" add constraint "users_name_key" UNIQUE using index "users_name_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users (id)
  values (new.id);
  return new;
end;
$function$
;

create policy "logged can get the posts"
on "public"."posts"
as permissive
for select
to authenticated
using (true);


create policy "owner can ctrl all"
on "public"."posts"
as permissive
for all
to authenticated
using ((owner = auth.uid()))
with check ((owner = auth.uid()));


create policy "anyone can get user profile check"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "only know myself"
on "public"."users"
as permissive
for select
to authenticated
using ((auth.uid() = id));


create policy "update self"
on "public"."users"
as permissive
for update
to authenticated
using ((auth.uid() = id))
with check ((auth.uid() = id));

