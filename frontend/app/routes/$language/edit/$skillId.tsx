import { useActionData, useLoaderData } from "@remix-run/react";
import { json, redirect, Response } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { prisma } from "~/db.server";
import Constructor from "~/modules/Constructor";
import { Language, Step } from "@prisma/client";
import {
  createSteps,
  deleteStepsFromSkill,
  getStepsBySkillId,
} from "~/models/lesson.server";
import { checkTitleUnique, getLastAddedSkills } from "~/models/skill.server";
import { getActiveLanguage } from "~/models/language.server";
import { getTodayDate } from "~/utils";
import { StepOptions } from "~/modules/Constructor/components/Levels/types";
import { ActionData } from "../new";

export const action = async ({ request, params }: ActionArgs) => {
  const form = await request.formData();
  const activeLanguage = await getActiveLanguage(request);

  if (!activeLanguage) {
    throw new Error("Active language is not found in editting the skill");
  }

  const { ...values } = Object.fromEntries(form);

  const stepsData = JSON.parse(values.steps as string) as Step[];
  const skillData = JSON.parse(values.skillData as string);

  const { skillTitle } = skillData;

  {
    /* Fix title unique checking */
  }

  // const isTitleUnique = await checkTitleUnique(activeLanguage.id, skillTitle);

  // if (isTitleUnique) {
  //   return json<ActionData>(
  //     {
  //       errors: { title: "Title isn't unique" },
  //     },
  //     { status: 400 }
  //   );
  // }

  await deleteStepsFromSkill(params.skillId as string);

  const createdStepIDs = await createSteps(
    stepsData.map((step) => ({ ...step, languageId: activeLanguage.id }))
  );
  const data = {
    title: skillTitle,
    stepIDs: createdStepIDs,
    currentLesson: 0,
    level: 0,
    updatedAt: getTodayDate(),
  };

  await prisma.skill.update({
    where: { id: params.skillId },
    data: { ...data },
  });

  return redirect(`/${activeLanguage.title}/skills`);
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const skill = await prisma.skill.findUnique({
    where: { id: params.skillId },
  });

  if (!skill) {
    throw new Response("Skill is not found", { status: 404 });
  }

  const activeLanguage = (await getActiveLanguage(request)) as Language;
  const lastAddedSkills = await getLastAddedSkills(activeLanguage.id);

  const steps = await getStepsBySkillId(skill.id);
  const data = {
    title: skill.title,
    steps: steps.map((step) => {
      const options: StepOptions = JSON.parse(
        step.options ? step.options : "{}"
      );
      return {
        ...step,
        options,
      };
    }),
    lineNumber: skill.lineNumber,
  };

  return json({ data, lastAddedSkills });
};

export default function EditSkill() {
  const actionData = useActionData<typeof action>();
  const { data } = useLoaderData<typeof loader>();

  return <Constructor data={data} actionData={actionData ? actionData : {}} />;
}
