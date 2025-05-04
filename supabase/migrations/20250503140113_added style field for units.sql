create type "public"."UnitStyleEnum" as enum ('owl', 'macaw', 'starfish', 'fox', 'cardinal', 'betta', 'bee', 'crab');

alter table "public"."units" add column "style" "UnitStyleEnum" not null default 'owl'::"UnitStyleEnum";


