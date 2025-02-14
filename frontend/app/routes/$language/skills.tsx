import { json, redirect, Response } from "@remix-run/node";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { getActiveLanguage } from "~/models/language.server";
import WeeklyProgress from "~/modules/Common/components/WeeklyProgress/WeeklyProgress";
import { getUser } from "~/session.server";
import { useLoaderData } from "@remix-run/react";
import SkillsList from "~/modules/Common/components/SkillsList";
import { deleteSkillById, getSkills } from "~/models/skill.server";
import { deleteStepsFromSkill } from "~/models/lesson.server";

export function ErrorBoundary() {
  return (
    <div className="error-container">Issues during loading Skills route</div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // Add popup to these funcitonality so the user thinks twice before deleting
  if (_action === "Delete skill") {
    const id = values.id as string;
    if (!id) {
      throw new Error("Skill id wasn't found");
    }

    await deleteStepsFromSkill(id);
    return await deleteSkillById(id);
  }
};

export const loader = async ({ request }: LoaderArgs) => {
  const activeLanguage = await getActiveLanguage(request);
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  if (!activeLanguage) {
    throw new Response(`We could not find the active language`, {
      status: 404,
    });
  }

  const skills = await getSkills(activeLanguage.id);
  return json({
    skills,
    activity: user.weeklyActivity,
    languageTitle: activeLanguage.title,
  });
};

export default function SkillsPage() {
  const { skills, activity, languageTitle } = useLoaderData<typeof loader>();

  return (
    <section style={{ display: "flex", width: "100%" }}>
      <SkillsList skills={skills} languageTitle={languageTitle} />
      <WeeklyProgress activity={activity} />
    </section>
  );
}
