import { getUser } from "~/session.server";
import { getLanguages } from "~/models/language.server";
import { redirect } from "@remix-run/node";
import { getTodayDate } from "~/utils";
import { getLastActivity, updateUserStreak } from "~/models/user.server";

export const loader = async ({ request }: { request: Request }) => {
  let user = await getUser(request);
  if (!user) {
    return redirect("/login");
  }

  const languages = await getLanguages(request);
  const activeLanguageTitle = languages?.find((it) => it.active)?.title;

  const today = getTodayDate();
  const lastActive = await getLastActivity(request);
  if (today - lastActive > 1 || lastActive === 0) {
    await updateUserStreak(user.id, false, 0);
  }

  if (today - lastActive === 1) {
    await updateUserStreak(user.id, false, user.streak);
  }

  if (!user.wasToday && lastActive === today) {
    await updateUserStreak(user.id, true, user.streak + 1);
  }

  return redirect(`/${activeLanguageTitle}/skills`);
};
