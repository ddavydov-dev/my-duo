drop policy "Enable delete for users based on user_id" on "public"."project";

drop policy "Enable insert for authenticated users only" on "public"."project";

drop policy "Enable update for users based on email" on "public"."project";

drop policy "Enable users to view their own data only" on "public"."project";

revoke delete on table "public"."project" from "anon";

revoke insert on table "public"."project" from "anon";

revoke references on table "public"."project" from "anon";

revoke select on table "public"."project" from "anon";

revoke trigger on table "public"."project" from "anon";

revoke truncate on table "public"."project" from "anon";

revoke update on table "public"."project" from "anon";

revoke delete on table "public"."project" from "authenticated";

revoke insert on table "public"."project" from "authenticated";

revoke references on table "public"."project" from "authenticated";

revoke select on table "public"."project" from "authenticated";

revoke trigger on table "public"."project" from "authenticated";

revoke truncate on table "public"."project" from "authenticated";

revoke update on table "public"."project" from "authenticated";

revoke delete on table "public"."project" from "service_role";

revoke insert on table "public"."project" from "service_role";

revoke references on table "public"."project" from "service_role";

revoke select on table "public"."project" from "service_role";

revoke trigger on table "public"."project" from "service_role";

revoke truncate on table "public"."project" from "service_role";

revoke update on table "public"."project" from "service_role";

alter table "public"."project" drop constraint "project_profile_id_fkey";

alter table "public"."project" drop constraint "project_pkey";

drop index if exists "public"."project_pkey";

drop table "public"."project";

create table "public"."exercises" (
    "id" uuid not null default gen_random_uuid(),
    "lesson_id" uuid not null default gen_random_uuid(),
    "type" text not null,
    "prompt" text not null,
    "answer" text not null,
    "metadata" jsonb not null,
    "order" smallint not null
);


alter table "public"."exercises" enable row level security;

create table "public"."lessons" (
    "id" uuid not null default gen_random_uuid(),
    "unit_id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "order" smallint not null default '0'::smallint,
    "is_completed" boolean not null default false
);


alter table "public"."lessons" enable row level security;

create table "public"."skills" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "is_active" boolean not null default true,
    "title" text not null,
    "profile_id" uuid not null default gen_random_uuid(),
    "is_public" boolean not null default false
);


alter table "public"."skills" enable row level security;

create table "public"."units" (
    "id" uuid not null default gen_random_uuid(),
    "skill_id" uuid not null default gen_random_uuid(),
    "title" text not null,
    "order" smallint not null default '0'::smallint
);


alter table "public"."units" enable row level security;

CREATE UNIQUE INDEX exercises_pkey ON public.exercises USING btree (id);

CREATE UNIQUE INDEX lessons_pkey ON public.lessons USING btree (id);

CREATE UNIQUE INDEX units_pkey ON public.units USING btree (id);

CREATE UNIQUE INDEX project_pkey ON public.skills USING btree (id);

alter table "public"."exercises" add constraint "exercises_pkey" PRIMARY KEY using index "exercises_pkey";

alter table "public"."lessons" add constraint "lessons_pkey" PRIMARY KEY using index "lessons_pkey";

alter table "public"."skills" add constraint "project_pkey" PRIMARY KEY using index "project_pkey";

alter table "public"."units" add constraint "units_pkey" PRIMARY KEY using index "units_pkey";

alter table "public"."exercises" add constraint "exercises_lesson_id_fkey" FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE not valid;

alter table "public"."exercises" validate constraint "exercises_lesson_id_fkey";

alter table "public"."lessons" add constraint "lessons_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES units(id) ON DELETE CASCADE not valid;

alter table "public"."lessons" validate constraint "lessons_unit_id_fkey";

alter table "public"."skills" add constraint "project_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profile(id) ON DELETE CASCADE not valid;

alter table "public"."skills" validate constraint "project_profile_id_fkey";

alter table "public"."units" add constraint "units_skill_id_fkey" FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE not valid;

alter table "public"."units" validate constraint "units_skill_id_fkey";

grant delete on table "public"."exercises" to "anon";

grant insert on table "public"."exercises" to "anon";

grant references on table "public"."exercises" to "anon";

grant select on table "public"."exercises" to "anon";

grant trigger on table "public"."exercises" to "anon";

grant truncate on table "public"."exercises" to "anon";

grant update on table "public"."exercises" to "anon";

grant delete on table "public"."exercises" to "authenticated";

grant insert on table "public"."exercises" to "authenticated";

grant references on table "public"."exercises" to "authenticated";

grant select on table "public"."exercises" to "authenticated";

grant trigger on table "public"."exercises" to "authenticated";

grant truncate on table "public"."exercises" to "authenticated";

grant update on table "public"."exercises" to "authenticated";

grant delete on table "public"."exercises" to "service_role";

grant insert on table "public"."exercises" to "service_role";

grant references on table "public"."exercises" to "service_role";

grant select on table "public"."exercises" to "service_role";

grant trigger on table "public"."exercises" to "service_role";

grant truncate on table "public"."exercises" to "service_role";

grant update on table "public"."exercises" to "service_role";

grant delete on table "public"."lessons" to "anon";

grant insert on table "public"."lessons" to "anon";

grant references on table "public"."lessons" to "anon";

grant select on table "public"."lessons" to "anon";

grant trigger on table "public"."lessons" to "anon";

grant truncate on table "public"."lessons" to "anon";

grant update on table "public"."lessons" to "anon";

grant delete on table "public"."lessons" to "authenticated";

grant insert on table "public"."lessons" to "authenticated";

grant references on table "public"."lessons" to "authenticated";

grant select on table "public"."lessons" to "authenticated";

grant trigger on table "public"."lessons" to "authenticated";

grant truncate on table "public"."lessons" to "authenticated";

grant update on table "public"."lessons" to "authenticated";

grant delete on table "public"."lessons" to "service_role";

grant insert on table "public"."lessons" to "service_role";

grant references on table "public"."lessons" to "service_role";

grant select on table "public"."lessons" to "service_role";

grant trigger on table "public"."lessons" to "service_role";

grant truncate on table "public"."lessons" to "service_role";

grant update on table "public"."lessons" to "service_role";

grant delete on table "public"."skills" to "anon";

grant insert on table "public"."skills" to "anon";

grant references on table "public"."skills" to "anon";

grant select on table "public"."skills" to "anon";

grant trigger on table "public"."skills" to "anon";

grant truncate on table "public"."skills" to "anon";

grant update on table "public"."skills" to "anon";

grant delete on table "public"."skills" to "authenticated";

grant insert on table "public"."skills" to "authenticated";

grant references on table "public"."skills" to "authenticated";

grant select on table "public"."skills" to "authenticated";

grant trigger on table "public"."skills" to "authenticated";

grant truncate on table "public"."skills" to "authenticated";

grant update on table "public"."skills" to "authenticated";

grant delete on table "public"."skills" to "service_role";

grant insert on table "public"."skills" to "service_role";

grant references on table "public"."skills" to "service_role";

grant select on table "public"."skills" to "service_role";

grant trigger on table "public"."skills" to "service_role";

grant truncate on table "public"."skills" to "service_role";

grant update on table "public"."skills" to "service_role";

grant delete on table "public"."units" to "anon";

grant insert on table "public"."units" to "anon";

grant references on table "public"."units" to "anon";

grant select on table "public"."units" to "anon";

grant trigger on table "public"."units" to "anon";

grant truncate on table "public"."units" to "anon";

grant update on table "public"."units" to "anon";

grant delete on table "public"."units" to "authenticated";

grant insert on table "public"."units" to "authenticated";

grant references on table "public"."units" to "authenticated";

grant select on table "public"."units" to "authenticated";

grant trigger on table "public"."units" to "authenticated";

grant truncate on table "public"."units" to "authenticated";

grant update on table "public"."units" to "authenticated";

grant delete on table "public"."units" to "service_role";

grant insert on table "public"."units" to "service_role";

grant references on table "public"."units" to "service_role";

grant select on table "public"."units" to "service_role";

grant trigger on table "public"."units" to "service_role";

grant truncate on table "public"."units" to "service_role";

grant update on table "public"."units" to "service_role";

create policy "Owner can manage exercises"
on "public"."exercises"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM ((lessons l
     JOIN units u ON ((u.id = l.unit_id)))
     JOIN skills p ON ((p.id = u.skill_id)))
  WHERE ((l.id = exercises.lesson_id) AND (p.profile_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM ((lessons l
     JOIN units u ON ((u.id = l.unit_id)))
     JOIN skills p ON ((p.id = u.skill_id)))
  WHERE ((l.id = exercises.lesson_id) AND (p.profile_id = auth.uid())))));


create policy "Owner can manage lessons"
on "public"."lessons"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (units u
     JOIN skills p ON ((p.id = u.skill_id)))
  WHERE ((u.id = lessons.unit_id) AND (p.profile_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM (units u
     JOIN skills p ON ((p.id = u.skill_id)))
  WHERE ((u.id = lessons.unit_id) AND (p.profile_id = auth.uid())))));


create policy "Enable delete for users based on user_id"
on "public"."skills"
as permissive
for delete
to authenticated
using ((profile_id = auth.uid()));


create policy "Enable insert for authenticated users only"
on "public"."skills"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable update for users based on email"
on "public"."skills"
as permissive
for update
to authenticated
using ((profile_id = auth.uid()))
with check ((profile_id = auth.uid()));


create policy "Enable users to view their own data only"
on "public"."skills"
as permissive
for select
to authenticated
using ((profile_id = auth.uid()));


create policy "Owner can manage units"
on "public"."units"
as restrictive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM skills
  WHERE ((skills.id = units.skill_id) AND (skills.profile_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM skills
  WHERE ((skills.id = units.skill_id) AND (skills.profile_id = auth.uid())))));



