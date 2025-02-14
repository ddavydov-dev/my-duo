import Constructor from "~/modules/Constructor";
import { prisma } from "~/db.server";
import { getActiveLanguage } from "~/models/language.server";
import { Language, Step } from "@prisma/client";
import { createSteps } from "~/models/lesson.server";
import {
  checkTitleUnique,
  getAmountOfSkillsOnTheLastRow,
} from "~/models/skill.server";
import { getTodayDate } from "~/utils";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useActionData } from "@remix-run/react";

// Temporary function for randomly set an amount of skills in a row.
// In the future will be changed on functionality of setting position on your own
function getRandomIntFromOneToThree() {
  return Math.floor(Math.random() * 3 + 1);
}

export type ActionData = {
  errors?: {
    title?: string;
  };
};

export function ErrorBoundary() {
  return (
    <div className="error-container">{`There was an error loading the constructor. Sorry.`}</div>
  );
}

export const action = async ({ request }: ActionArgs) => {
  const activeLanguage = (await getActiveLanguage(request)) as Language;
  const form = await request.formData();

  const { ...values } = Object.fromEntries(form);

  const stepsData = JSON.parse(values.steps as string) as Step[];
  const skillData = JSON.parse(values.skillData as string);

  const { skillTitle } = skillData;

  const doesTitleAlreadyExist = await checkTitleUnique(
    activeLanguage.id,
    skillTitle
  );

  // if (doesTitleAlreadyExist) {
  //   return json<ActionData>(
  //     {
  //       errors: { title: "Title isn't unique" },
  //     },
  //     { status: 400 }
  //   );
  // }

  if (!doesTitleAlreadyExist) {
    let lineNumber = 0;
    const amountData = await getAmountOfSkillsOnTheLastRow(activeLanguage.id);
    if (amountData) {
      if (amountData.count >= getRandomIntFromOneToThree()) {
        lineNumber = amountData.lastLineNumber + 1;
      } else {
        lineNumber = amountData.lastLineNumber;
      }
    }

    const createdStepIDs = await createSteps(
      stepsData.map((step) => ({ ...step, languageId: activeLanguage.id }))
    );

    const uniqueLessons: string[] = [];
    stepsData.map((step) => {
      if (
        !Boolean(
          uniqueLessons.find((lessonId) => lessonId === step.parentLessonId)
        )
      ) {
        uniqueLessons.push(step.parentLessonId);
      }
    });
    const lessonsAmount = uniqueLessons.length;

    const data = {
      title: skillTitle,
      stepIDs: createdStepIDs,
      currentLesson: 0,
      lessonsAmount,
      level: 0,
      languageId: activeLanguage.id,
      updatedAt: getTodayDate(),
      lineNumber: Number(lineNumber),
    };
    const skill = await prisma.skill.create({ data });
    return redirect(`/skill/${skill.title}/1`);
  }

  return json<ActionData>(
    {
      errors: { title: "Title isn't unique" },
    },
    { status: 400 }
  );
};

export default function NewSkillPage() {
  const actionData = useActionData<typeof action>();

  return <Constructor actionData={actionData ? actionData : {}} />;
}
