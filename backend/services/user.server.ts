import type { User, WeeklyActivity } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";
import { getUser } from "~/session.server";
import { getCurrentWeek, getTodayDate, getWeekDay } from "~/utils";
import { createInitialLanguage, whenLastPractice } from "./language.server";

export type { User } from "@prisma/client";

const emptyWeek = {
  Sun: 0,
  Mon: 0,
  Tue: 0,
  Wed: 0,
  Thu: 0,
  Fri: 0,
  Sat: 0,
};

export async function createUser(username: User["username"], password: string) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
      streak: 0,
      wasToday: false,
      weeklyActivity: {
        ...emptyWeek,
      },
    },
  });

  await createInitialLanguage(user.id);

  return user;
}

export async function updateUserStreak(
  id: User["id"],
  wasToday: boolean,
  streak: number
) {
  return prisma.user.update({
    where: { id },
    data: { wasToday, streak },
  });
}

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByUsername(username: User["username"]) {
  return prisma.user.findUnique({ where: { username } });
}

export async function deleteUserByUsername(username: User["username"]) {
  return prisma.user.delete({ where: { username } });
}

export async function verifyLogin(
  username: User["username"],
  password: string
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { username },
  });

  if (!userWithPassword || !userWithPassword.passwordHash) {
    return null;
  }

  const isValid = await bcrypt.compare(password, userWithPassword.passwordHash);

  if (!isValid) {
    return null;
  }

  const { passwordHash: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}

export async function increaseTodayExp(request: Request, value: number) {
  const today = getWeekDay() as keyof WeeklyActivity;
  let user = await getUser(request);
  if (!user) throw new Error("User is undefined");

  if (!user.wasToday) {
    user = await updateUserStreak(user.id, true, user.streak + 1);
  }

  return await prisma.user.update({
    where: { id: user.id },
    data: {
      weeklyActivity: {
        ...user.weeklyActivity,
        [today]: user.weeklyActivity[today] + value,
      },
    },
  });
}

export async function resetTodayActivity(request: Request) {
  const user = await getUser(request);
  if (!user) throw new Error("User is undefined");

  return await prisma.user.update({
    where: { id: user.id },
    data: {
      weeklyActivity: {
        ...user.weeklyActivity,
        [`${getWeekDay()}`]: 0,
      },
    },
  });
}

export async function resetMultipleActivity(
  request: Request,
  lastPracticed: number
) {
  const today = getTodayDate();
  const user = await getUser(request);
  if (!user) throw new Error("User is undefined");

  const currentWeek = getCurrentWeek();
  const newWeek = user.weeklyActivity;
  let i = today - lastPracticed;

  if (i > 6) {
    return await prisma.user.update({
      where: { id: user.id },
      data: {
        weeklyActivity: {
          ...emptyWeek,
        },
      },
    });
  }

  currentWeek.forEach((day, index) => {
    if (i > 0 && index === 7 - i) {
      newWeek[day as keyof WeeklyActivity] = 0;
      i -= 1;
    }
  });

  return await prisma.user.update({
    where: { id: user.id },
    data: {
      weeklyActivity: {
        ...newWeek,
      },
    },
  });
}

export async function getLastActivity(request: Request) {
  const today = getTodayDate();
  const lastPracticed = await whenLastPractice(request);

  if (today - lastPracticed > 0) {
    await resetMultipleActivity(request, lastPracticed);
    return lastPracticed;
  }

  return today;
}

export async function getTodayTotalXP(request: Request) {
  const today = getWeekDay() as keyof WeeklyActivity;
  let user = await getUser(request);
  if (!user) throw new Error("User is undefined");

  const data = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      weeklyActivity: true,
    },
  });

  if (!data) throw new Error("No weekly activity was found in getTodayTotalXP");

  return data.weeklyActivity[today];
}
