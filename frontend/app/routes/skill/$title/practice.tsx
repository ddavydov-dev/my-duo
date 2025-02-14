import Lesson from "~/modules/Skill";
import { getActiveLanguage } from "~/models/language.server";
import { getTodayTotalXP, increaseTodayExp } from "~/models/user.server";
import { getSkillByTitle, updateCurrentChapter } from "~/models/skill.server";
import { useCatch, useLoaderData, useParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { getStepsForPracticingSkill } from "~/models/lesson.server";
import ErrorMessage from "~/modules/Common/components/ErrorMessage";

export const action = async ({ request, params }: ActionArgs) => {
  const activeLanguage = await getActiveLanguage(request);

  if (!activeLanguage) {
    throw new Error("No active language found");
  }

  const form = await request.formData();
  const expData = Number(form.get("exp"));
  const title = params.title as string;

  const skill = await getSkillByTitle(title, activeLanguage.id);

  if (!skill) {
    throw new Error(`Skill with this title: ${title} is underfined`);
  }

  await updateCurrentChapter(skill);

  await increaseTodayExp(request, expData);

  return redirect(`/${activeLanguage?.title}/skills`);
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const activeLanguage = await getActiveLanguage(request);

  if (!activeLanguage) {
    throw new Error("No active language found");
  }

  const title = params.title as string;

  const skill = await getSkillByTitle(title, activeLanguage.id);

  if (!skill) {
    throw new Response("Skill is not found", { status: 404 });
  }

  const steps = await getStepsForPracticingSkill(
    skill.title,
    activeLanguage.id
  );

  const totalXP = await getTodayTotalXP(request);

  return json({ steps, totalXP });
};

export default function LessonScreen() {
  const { steps, totalXP } = useLoaderData<typeof loader>();

  return <Lesson steps={steps} totalXP={totalXP} />;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <ErrorMessage>{caught.statusText}</ErrorMessage>;
  }
}

export function ErrorBoundary() {
  const { title } = useParams();
  return (
    <div className="error-container">{`There was an error loading skill by the title ${title}. Sorry.`}</div>
  );
}
