import { prisma } from "~/db.server";
import Lesson from "~/modules/Skill";
import { getUser } from "~/session.server";
import { WeeklyActivity } from "@prisma/client";
import { getWeekDay } from "~/utils";
import { ActionArgs, json, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";
import { getStepsForPracticing } from "~/models/lesson.server";
import { getActiveLanguage } from "~/models/language.server";
import { getTodayTotalXP } from "~/models/user.server";

export function ErrorBoundary() {
  const { lessonId } = useParams();
  return (
    <div className="error-container">{`There was an error loading lesson by the id ${lessonId}. Sorry.`}</div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const expData = Number(form.get("exp"));
  const user = await getUser(request);

  if (!user) {
    return redirect("/login");
  }

  const today = getWeekDay() as keyof WeeklyActivity;

  const newUserActivity = user.weeklyActivity;
  newUserActivity[today] = newUserActivity[today] + 10;

  await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      weeklyActivity: { ...newUserActivity },
    },
  });

  return redirect(`/`);
};

export const loader = async ({ request }: LoaderArgs) => {
  const activeLanguage = await getActiveLanguage(request);

  if (!activeLanguage) {
    throw new Error(`No active language has found`);
  }

  const steps = await getStepsForPracticing(activeLanguage.id);

  if (steps.length === 0) {
    throw new Error("Steps for practicing are not found");
  }

  const totalXP = await getTodayTotalXP(request);

  return json({ steps, totalXP });
};

export default function Practice() {
  const { steps, totalXP } = useLoaderData<typeof loader>();

  return <Lesson steps={steps} totalXP={totalXP} />;
}
