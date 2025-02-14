import { Skill } from "@prisma/client";
import { prisma } from "~/db.server";
import { getTodayDate } from "~/utils";

export async function createSkill(data: Skill) {
  return await prisma.skill.create({ data });
}

export async function getSkills(languageId: string) {
  return await prisma.skill.findMany({
    take: 20,
    where: { languageId: languageId },
    select: {
      id: true,
      title: true,
      // createdAt: true,
      lessonsAmount: true,
      stepIDs: true,
      currentLesson: true,
      lineNumber: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateCurrentChapter(skill: Skill) {
  const { currentLesson, stepIDs, id } = skill;
  const today = getTodayDate();

  return await prisma.skill.update({
    where: {
      id,
    },
    data: {
      currentLesson:
        stepIDs.length !== currentLesson ? currentLesson + 1 : currentLesson,
      updatedAt: today,
    },
  });
}

export async function checkTitleUnique(languageId: string, title: string) {
  const skills = await prisma.skill.findMany({ where: { languageId } });
  return Boolean(skills.find((skill) => skill.title === title));
}

export async function getLastAddedSkill(languageId: string) {
  const lastAddedSkill = await prisma.skill.findFirst({
    where: { languageId },
    orderBy: { createdAt: "desc" },
    select: {
      lineNumber: true,
      currentLesson: true,
      stepIDs: true,
      // lessonsAmount: true,
      title: true,
      id: true,
    },
  });

  return lastAddedSkill;
}

export async function getLastAddedSkills(languageId: string) {
  const lastAddedSkill = await prisma.skill.findFirst({
    where: { languageId },
    orderBy: { createdAt: "desc" },
    select: {
      lineNumber: true,
    },
  });
  return await prisma.skill.findMany({
    where: { languageId, lineNumber: lastAddedSkill?.lineNumber },
    select: {
      lineNumber: true,
      currentLesson: true,
      stepIDs: true,
      title: true,
      id: true,
    },
  });
}

export async function getAmountOfSkillsOnTheLastRow(languageId: string) {
  const lastAddedSkill = await prisma.skill.findFirst({
    where: { languageId },
    orderBy: { createdAt: "desc" },
    select: {
      lineNumber: true,
    },
  });

  if (!lastAddedSkill) {
    return null;
  }

  const count = await prisma.skill.count({
    where: { languageId, lineNumber: lastAddedSkill.lineNumber },
  });

  return { count, lastLineNumber: lastAddedSkill.lineNumber };
}

export async function deleteSkillById(id: string) {
  return await prisma.skill.delete({ where: { id } });
}

export async function getSkillByTitle(title: string, languageId: string) {
  return await prisma.skill.findFirst({ where: { title, languageId } });
}
